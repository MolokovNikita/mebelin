import { useParams, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from "../styles/product.module.css";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import config from "../config/config";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
import ReviewPopUp from "../components/ReviewPopUp";

export default function ProductPage() {
  const location = useLocation();
  const { category, productID } = useParams(); // Достаем параметры из пути
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0); // Для смены главного изображения
  const [isFullscreen, setIsFullscreen] = useState(false); // Для управления полноэкранным режимом
  const [categoryName, setCategoryName] = useState(location.state?.name || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorBlur, setSelectedColorBlur] = useState("");
  const [error, setError] = useState(false);
  const [isReviewPopUpOpen, setIsReviewPopUpOpen] = useState(false);
  const { basket, setBasket, favoritesList, setFavoritesList } =
    useContext(ProductsContext);
    const { isAuth, userData } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${config.API_URL}/type-tovara`).then((res) => {
      let type_tovara = "";
      res.data.forEach((val) => {
        if (val.name_tovar === category) type_tovara = val.id_tovara;
      });

      const TYPE_TOVARA = type_tovara;
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${config.API_URL}/tovar/${productID}`,
            {
              params: {
                tovar_type: TYPE_TOVARA,
              },
            },
          );
          const productData = response.data; // Получаем единственный товар
          // Получаем дополнительные данные для единственного товара
          const [fabricRes, kachRes, typeRes, reviewsRes] = await Promise.all([
            axios.get(
              `${config.API_URL}/fabric/${productData.fabric_id_fabric}`,
            ),
            axios.get(
              `${config.API_URL}/kachestvo/${productData.kachestvo_tovara_id_kach}`,
            ),
            axios.get(
              `${config.API_URL}/type-tovara/${productData.type_tovara_id_tovara}`,
            ),
            axios.get(`${config.API_URL}/reviews/${productData.id_tovar}`), // Запрос отзывов по id товара
          ]);
          setSelectedColor(productData.color);
          setSelectedColorBlur(productData.color);
          // Устанавливаем состояние продукта
          setProduct({
            ...productData,
            fabrick: fabricRes.data.adress_fabric,
            kach_tovara: kachRes.data.name_kach,
            type_tovara: typeRes.data.name_tovar,
            scores: reviewsRes.data,
            score:
              reviewsRes && reviewsRes.data.length > 0
                ? parseFloat(
                    (
                      reviewsRes.data.reduce((acc, val) => {
                        const score = parseFloat(val.score);
                        return acc + (isNaN(score) ? 0 : score);
                      }, 0) / reviewsRes.data.length
                    ).toFixed(1),
                  ) || 0
                : 0,
            scores_count: reviewsRes ? reviewsRes.data.length : 0,
            pictures: Array.from(
              { length: productData.pictures_count },
              (_, index) =>
                `${config.API_URL}/uploads/product_pictures/${typeRes.data.name_tovar}_${productData.id_tovar}/0${index + 1}.png`,
            ),
          });
        } catch (error) {
          console.error("Ошибка при загрузке товара:", error);
          setError(true);
          window.location.href = "/catalog";
        }
      };

      fetchProducts();
    });
  }, [category, productID]);

  const favnotify = () =>
    toast.success("Товар добавлен в избранное!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.toast_msg,
    });
  const basketnotify = () =>
    toast.success("Товар добавлен в корзину!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.toast_msg,
    });
  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  const handlePrevImage = () => {
    console.log(product);
    setCurrentImage((prev) =>
      prev === 0 ? product.pictures.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === product.pictures.length - 1 ? 0 : prev + 1,
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    basketnotify();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) =>
          item.id_tovar === product.id_tovar && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [
          ...prevBasket,
          { ...product, quantity: 1, color: selectedColor },
        ];
      }
    });
  };

  const decreaseQuantity = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) =>
          item.id_tovar === product.id_tovar && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        const newQuantity = updatedBasket[existingProductIndex].quantity - 1;
        if (newQuantity > 0) {
          updatedBasket[existingProductIndex].quantity = newQuantity;
        } else {
          // Если количество становится 0, удаляем товар из корзины
          updatedBasket.splice(existingProductIndex, 1);
        }
        return updatedBasket;
      }
      return prevBasket;
    });
  };

  const increaseQuantity = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) =>
          item.id_tovar === product.id_tovar && item.color === selectedColor,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [
          ...prevBasket,
          { ...product, quantity: 1, color: selectedColor },
        ];
      }
    });
  };

  const getProductQuantity = (product) => {
    const productInBasket = basket.find(
      (item) =>
        item.id_tovar === product.id_tovar && item.color === selectedColor,
    );
    return productInBasket ? productInBasket.quantity : 0;
  };

  const addToFavorites = (product, event) => {
    favnotify();
    event.stopPropagation();
    event.preventDefault();
    setFavoritesList((favoritesList) => [...favoritesList, product]);
  };
  const removeFromFavorites = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    setFavoritesList((favoritesList) => {
      const newFavoritesList = [...favoritesList];
      const index = newFavoritesList.findIndex(
        (item) => item.id_tovar === product.id_tovar,
      );
      if (index !== -1) {
        newFavoritesList.splice(index, 1);
      }
      return newFavoritesList;
    });
  };
  const checkProductFavorite = (product, event) => {
    const productInFavorites = favoritesList.find(
      (item) => item.id_tovar === product.id_tovar,
    );
    if (productInFavorites) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      const img = document.getElementById("main-img");
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen();
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen();
      }
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (!categoryName) {
      switch (category) {
        case "chair":
          setCategoryName("Столы и стулья");
          break;
        case "bed":
          setCategoryName("Кровати и матрасы");
          break;
        case "sofa":
          setCategoryName("Диваны и кресла");
          break;
        case "wardrobe":
          setCategoryName("Шкафы и стеллажи");
          break;
        case "kitchen":
          setCategoryName("Кухонные гарнитуры");
          break;
        default:
          setCategoryName("Неизвестная категория");
      }
    }
  }, [category, categoryName]);
  const handleLeaveReview = () =>{
    if(!isAuth) {
      alert('Вы не авториованы!');
      return;}
      setIsReviewPopUpOpen(true);
  }
  // useEffect(()=>{
  //   if(error)
  //      <Navigate to="/catalog" />;
  // },[error])
  return (
    <>
      {error ? null : (
        <div className={styles.content__wrap}>
          <div className={styles.path__line}>
            <Link to="/">Главная</Link> &gt;&nbsp;
            <Link to="/catalog">Каталог</Link> &gt;&nbsp;
            <Link to={`/catalog/${category}`}>{categoryName}</Link> &gt;&nbsp;
            <Link to={`/catalog/${category}/${productID}`}>
              {product.name_tovar}
            </Link>
          </div>
          <div className={styles.product__container}>
            <div className={styles.image__container}>
              <div className={styles.main_image__container}>
                {product.pictures && product.pictures.length > 0 ? (
                  <img
                    id="main-img"
                    src={product.pictures[currentImage]}
                    alt={product.name_tovar}
                    className={styles.main__img}
                    onClick={toggleFullscreen}
                  />
                ) : null}
                <ArrowForwardIosIcon
                  fontSize={"large"}
                  onClick={handlePrevImage}
                  className={styles.prevArrow}
                />
                <ArrowBackIosIcon
                  fontSize={"large"}
                  onClick={handleNextImage}
                  className={styles.nextArrow}
                />
              </div>
              <div className={styles.preview_images__container}>
                {product.pictures &&
                  product.pictures.map((picture, index) => (
                    <div
                      key={index}
                      className={styles.preview_image_container}
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        className={`${styles.preview__image} ${
                          currentImage === index ? styles.active : ""
                        }`}
                        src={picture}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.main_info__conainer}>
              <div className={styles.product_name}>
                {product.name_tovar}
                <span className={styles.atricul__text}>#{productID}</span>
                {checkProductFavorite(product) == false ? (
                  <button
                    className={styles.favorite__btn}
                    onClick={(event) => addToFavorites(product, event)}
                  >
                    <FavoriteBorderIcon fontSize="large" />
                  </button>
                ) : (
                  <button
                    className={styles.favorite__button}
                    onClick={(event) => removeFromFavorites(product, event)}
                  >
                    <FavoriteIcon fontSize="large" />
                  </button>
                )}
                <ToastContainer />
              </div>
              <div className={styles.score__container}>
                <StarIcon className={styles.star__icon} />
                {product.score ? product.score : 0} | &nbsp;
                <a href="#score" className={styles.product_score__count}>
                  {product.scores_count ? product.scores_count : 0} отзывов
                </a>
              </div>
              <div
                className={
                  product.discount
                    ? styles.product_discount__price
                    : styles.product__price
                }
              >
                {product.discount ? (
                  <>
                    <p>
                      {product.price - product.price * product.discount + "₽"}
                    </p>
                    <p className={styles.price__without_discount}>
                      {" "}
                      {product.price} ₽
                    </p>
                    <p className={styles.sales__badge}>
                      Скидка - {product.discount * 100} %
                    </p>
                  </>
                ) : (
                  <> {product.price} ₽</>
                )}
              </div>
              <div className={styles.add_to_basket_btn__container}>
                {getProductQuantity(product) == 0 ? (
                  <>
                    <button
                      className={styles.add_to_basket__btn}
                      onClick={(event) => addToCart(product, event)}
                    >
                      Добавить в корзину
                    </button>
                  </>
                ) : (
                  <div
                    className={styles.basket__control}
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                    }}
                  >
                    <div
                      className={styles.increase__btn}
                      onClick={(event) => decreaseQuantity(event, product)}
                    >
                      -
                    </div>
                    {getProductQuantity(product)}
                    <div
                      className={styles.decrease__btn}
                      onClick={(event) => increaseQuantity(event, product)}
                    >
                      +
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.color_select__container}>
                <p className={styles.color__text}>Цвет: {selectedColorBlur}</p>
                <div className={styles.select_photo__container}>
                  {product.avaliable_colors ? (
                    <ul
                      className={styles.select_photo__list}
                      onMouseLeave={() => {
                        setSelectedColorBlur(selectedColor);
                      }}
                    >
                      {product.avaliable_colors.map((color, index) => {
                        return (
                          <li key={index}>
                            <a
                              onMouseEnter={() => {
                                setSelectedColorBlur(color);
                              }}
                            >
                              <img
                                className={`${styles.select__img} ${
                                  selectedColor && selectedColor === color
                                    ? styles.active_color
                                    : ""
                                }`}
                                src={product.pictures[0]}
                                alt={`color-${index}`}
                                onClick={() => {
                                  setSelectedColor(color);
                                }}
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
              <div className={styles.main_specifications__container}>
                <p className={styles.main_specifications__ttile}>
                  Основные характеристики
                </p>
                <div className={styles.main__specifications}>
                  <div className={styles.main_specifications_item__container}>
                    <p>Качество товара : </p>
                    <p>{product.kach_tovara}</p>
                  </div>
                  <div className={styles.main_specifications_item__container}>
                    <p>Фабрика изготовления : </p>
                    <p>{product.fabrick}</p>
                  </div>
                  <div className={styles.main_specifications_item__container}>
                    <p>Размеры (ШxВxГ) : </p>
                    <p>{product.size}</p>
                  </div>
                  <div className={styles.main_specifications_item__container}>
                    <p>Гарантия : </p>
                    <p>{product.warranty}</p>
                  </div>
                  <div className={styles.main_specifications_item__container}>
                    <p>Срок службы : </p>
                    <p>{product.service_life}</p>
                  </div>
                  <div className={styles.main_specifications_item__container}>
                    <p>Материал изделия: </p>
                    <p>{product.material}</p>
                  </div>
                </div>
                {/* <div className={styles.show_all_info__container}>
                  <button className={styles.show_all_info__button}>
                    Показать все
                  </button>
                </div> */}
              </div>
              {/* <div className={styles.stock__container}>
                В наличии:{" "}
                <a href="#" className={styles.stock__link}>
                  в{" "}
                  {product.availability_in_stores
                    ? product.availability_in_stores.length
                    : null}{" "}
                  магазинах
                </a>
              </div> */}
            </div>
          </div>
          <div className={styles.scores__title}>Отзывы</div>
          <div className={styles.scores__container}>
            <div className={styles.scores_info__container}>
              <div id="score" className={styles.scores__list}>
                <p className={styles.main_score__title}>
                  Рейтинг покупателей:{" "}
                </p>
                <div className={styles.main_score__container}>
                  <Rating
                    className={styles.rating__scale}
                    name="half-rating-read"
                    value={product.score || 0}
                    precision={0.5}
                    readOnly
                  />
                  <p>{product.score}</p>
                </div>
                <p className={styles.scores__count}>
                  Кол-во оценок: {product.scores ? product.scores.length : 0}
                </p>
                <button className={styles.leave_review__btn}
                onClick={handleLeaveReview}>
                  {" "}
                  Оставить отзыв
                </button>
                {isReviewPopUpOpen ? <ReviewPopUp productId = {productID} onClose = {()=>{setIsReviewPopUpOpen(false)}} /> : null}
              </div>
            </div>
            <div className={styles.main_scores__container}>
              <div className={styles.main_score__score}>
                {product.scores ? (
                  <ul className={styles.user_scores__list}>
                    {product.scores.map((item, index) => (
                      <li key={index}>
                        <Rating
                          className={styles.rating__scale}
                          name="half-rating-read"
                          value={parseFloat(item.score) || 0} // Используем item.score для получения рейтинга
                          precision={0.5}
                          readOnly
                        />
                        <div className={styles.score_avatar__container}>
                          <img
                            src="/user-ava.png"
                            alt="avatar"
                            className={styles.score__avatar}
                          />
                          <div className={styles.user__info}>
                            <p>
                              {item.user_name} {item.user_surname}
                            </p>
                            <p>Цвет: белый</p>
                          </div>
                        </div>
                        <div className={styles.user_score__body}>
                          <strong>
                            <p>Комментарий:</p>
                          </strong>
                          <p>{item.comment} </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
