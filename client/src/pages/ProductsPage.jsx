import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "../styles/products.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
import { ProductsContext } from "../context/ProductsContext";
export default function ProductsPage() {
  const { basket, setBasket, favoritesList, setFavoritesList } =
    useContext(ProductsContext);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const location = useLocation();
  // useEffect(()=>{
  //   axios.get(`${config.API_URL}/reviews/2`)
  //   .then((res)=>console.log(res)) // Запрос отзывов по id товара
  // },[])

  useEffect(() => {
    setCategoryName(location.state?.name || "");
    axios
      .get(`${config.API_URL}/type-tovara`)
      .then((res) => {
        let type_tovara = "";
        res.data.forEach((val, indx) => {
          if (val.name_tovar === category) type_tovara = val.id_tovara;
        });
        const TYPE_TOVARA = type_tovara;
        if (!TYPE_TOVARA) throw new Error("Type tovara error");
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${config.API_URL}/tovar`, {
              params: {
                tovar_type: TYPE_TOVARA, // Используем параметр категории
              },
            });
            const productsData = response.data;

            // Для каждого товара получаем дополнительные данные
            const detailedProducts = await Promise.all(
              productsData.map(async (product) => {
                const [fabricRes, kachRes, typeRes, reviewsRes] =
                  await Promise.all([
                    axios.get(
                      `${config.API_URL}/fabric/${product.fabric_id_fabric}`,
                    ),
                    axios.get(
                      `${config.API_URL}/kachestvo/${product.kachestvo_tovara_id_kach}`,
                    ),
                    axios.get(
                      `${config.API_URL}/type-tovara/${product.type_tovara_id_tovara}`,
                    ),
                    axios.get(`${config.API_URL}/reviews/${product.id_tovar}`), // Запрос отзывов по id товара
                  ]);
                return {
                  ...product,
                  fabrick: fabricRes.data.adress_fabric,
                  kach_tovara: kachRes.data.name_kach,
                  type_tovara: typeRes.data.name_tovar,
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
                  //reviewsRes.data.count ||
                  pictures: Array.from(
                    { length: product.pictures_count },
                    (_, index) =>
                      `${config.API_URL}/uploads/product_pictures/${typeRes.data.name_tovar}_${product.id_tovar}/0${index + 1}.png`,
                  ),
                };
              }),
            );

            setProducts(detailedProducts);
            setCurrentImageIndices(
              detailedProducts.reduce((acc, product) => {
                acc[product.id_tovar] = 0;
                return acc;
              }, {}),
            );
            setIsLoading(false);
          } catch (error) {
            console.error("Ошибка при загрузке товаров:", error);
            setIsLoading(false);
          }
        };

        fetchProducts();
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [category, location.state]);

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
  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    basketnotify();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) => item.id_tovar === product.id_tovar,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex] = {
          ...updatedBasket[existingProductIndex],
          quantity: updatedBasket[existingProductIndex].quantity + 1,
        };
        return updatedBasket;
      } else {
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex(
        (item) => item.id_tovar === product.id_tovar,
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
        (item) => item.id_tovar === product.id_tovar,
      );
      if (existingProductIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingProductIndex].quantity += 1;
        return updatedBasket;
      } else {
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });
  };

  const getProductQuantity = (product) => {
    const productInBasket = basket.find(
      (item) => item.id_tovar === product.id_tovar,
    );
    if (productInBasket) {
      return productInBasket.quantity;
    } else {
      return 0;
    }
  };

  const addToFavorites = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    favnotify();
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevImage = (productId, event) => {
    event.stopPropagation();
    event.preventDefault();
    const currentIndex = currentImageIndices[productId] || 0;
    const totalImages =
      products.find((item) => item.id_tovar === productId)?.pictures.length ||
      0;
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;

    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [productId]: prevIndex,
    }));
  };

  const handleNextImage = (productId, event) => {
    event.stopPropagation();
    event.preventDefault();
    const currentIndex = currentImageIndices[productId] || 0;
    const totalImages =
      products.find((item) => item.id_tovar === productId)?.pictures.length ||
      0;
    const nextIndex = (currentIndex + 1) % totalImages;

    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [productId]: nextIndex,
    }));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    cursor: "pointer",
    padding: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    fontFamily: '"Nunito", sans-serif',
    borderRadius: "10px",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  }));

  return (
    <>
      <ToastContainer />
      <div className={styles.category_name__title}>{categoryName}</div>
      {isLoading ? null : (
        <>
          {products.length === 0 && !isLoading ? (
            <>
              <div className={styles.error__block}>
                <span style={{ color: "red" }}>Упс, </span>&nbsp;кажется товаров
                данной категории не существует...
              </div>
              <div className={styles.back_btn}>
                <Link to="/catalog">
                  <button>Вернуться в каталог</button>
                </Link>
              </div>
            </>
          ) : (
            <Grid container spacing={6} className={styles.products__container}>
              {products
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage,
                )
                .map((product) => (
                  <Grid size={3} key={product.id_tovar}>
                    <Link to={`/catalog/${category}/${product.id_tovar}`}>
                      <Item className={styles.product__item}>
                        <div className={styles.image__slider}>
                          <ArrowBackIosIcon
                            className={styles.left__arrow}
                            onClick={(event) =>
                              handlePrevImage(product.id_tovar, event)
                            }
                          />
                          <img
                            className={styles.product__image}
                            src={
                              product.pictures[
                                currentImageIndices[product.id_tovar] || 0
                              ]
                            }
                            alt={`${product.name_tovara}`}
                          />
                          <ArrowForwardIosIcon
                            className={styles.right__arrow}
                            onClick={(event) =>
                              handleNextImage(product.id_tovar, event)
                            }
                          />
                        </div>
                        <div className={styles.image__dots}>
                          {product.pictures.map((_, index) => (
                            <span
                              key={index}
                              className={
                                currentImageIndices[product.id_tovar] === index
                                  ? styles.active__dot
                                  : styles.dot
                              }
                            ></span>
                          ))}
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
                                {product.price -
                                  product.price * product.discount}{" "}
                                ₽
                              </p>
                              <p className={styles.price__without_discount}>
                                {product.price} ₽
                              </p>
                              <p className={styles.sales__badge}>
                                - {product.discount * 100} %
                              </p>
                            </>
                          ) : (
                            <>{product.price} ₽</>
                          )}
                        </div>
                        <p className={styles.product_desc__name}>
                          {product.name_tovar}
                        </p>
                        <p className={styles.product__description}>
                          {product.size}, {product.material}
                          {product.color_tovara}, {product.fabrick},{" "}
                          {product.warranty}
                        </p>
                        <div className={styles.product__score}>
                          <StarIcon className={styles.star__icon} />
                          {product.score ? product.score : 0} | &nbsp;
                          <p className={styles.product_score__count}>
                            {product.scores_count ? product.scores_count : 0}{" "}
                            отзывов
                          </p>
                        </div>
                        {getProductQuantity(product) == 0 ? (
                          <>
                            <button
                              className={styles.basket__button}
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
                              onClick={(event) =>
                                decreaseQuantity(event, product)
                              }
                            >
                              -
                            </div>
                            {getProductQuantity(product)}
                            <div
                              className={styles.decrease__btn}
                              onClick={(event) =>
                                increaseQuantity(event, product)
                              }
                            >
                              +
                            </div>
                          </div>
                        )}
                        {checkProductFavorite(product) == false ? (
                          <button
                            className={styles.favorites__button}
                            onClick={(event) => addToFavorites(product, event)}
                          >
                            <FavoriteBorderIcon />
                          </button>
                        ) : (
                          <button
                            className={styles.favorite__button}
                            onClick={(event) =>
                              removeFromFavorites(product, event)
                            }
                          >
                            <FavoriteIcon />
                          </button>
                        )}
                      </Item>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          )}
        </>
      )}
      <div className={styles.pagination}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={
              currentPage === pageNumber
                ? styles.page__button_active
                : styles.page__button
            }
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}
