import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductPage() {
  const location = useLocation();
  const { category, productID } = useParams(); // Достаем параметры из пути
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0); // Для смены главного изображения
  const [isFullscreen, setIsFullscreen] = useState(false); // Для управления полноэкранным режимом
  const [categoryName, setCategoryName] = useState(location.state?.name || "");
  useEffect(() => {
    console.log("Fetching to ", category, productID);
    const res = {
      id: productID,
      pictures_count: 4,
      pictures: [
        `/products_images/chair_${productID}/01.png`,
        `/products_images/chair_${productID}/02.png`,
        `/products_images/chair_${productID}/03.png`,
        `/products_images/chair_${productID}/04.png`,
      ],
      discount: 0.5,
      name_tovara: `Стул фишер`,
      price: 2500,
      score: 3.2,
      avaliable_colors: ["серый", "черный"],
      scores: [
        {
          user_id: 1,
          user_name: "Петр",
          user_surname: "Печкин",
          score: 5,
          comment: "Это хороший отзыв",
        },
        {
          user_id: 2,
          user_name: "Александр",
          user_surname: "Стомма",
          score: 2,
          comment: "Это плохой отзыва",
        },
      ],
      type_tovara: "Стул",
      color_tovara: "Белый",
      kach_tovara: "Среднее",
      fabrick: "Химки",
      size: "130x100x10",
      warranty: "36 месяцев",
      service_life: "10 лет",
      material: "ЛДСП",
      availability_in_stores: [
        {
          store_id: 1,
          address: "Москва",
        },
      ],
      additional_infotmation: [{ someInfo: 1 }],
    };
    setProduct(res);
  }, []);
  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  const handlePrevImage = () => {
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

  return (
    <div className={styles.content__wrap}>
      <div className={styles.path__line}>
        <a href="">Главная</a> &gt;
        <a href="">Каталог</a> &gt;
        <a href="">{categoryName}</a> &gt;
        <a href="">{product.name_tovara}</a>
      </div>
      <div className={styles.product__container}>
        <div className={styles.image__container}>
          <div className={styles.main_image__container}>
            {product.pictures && product.pictures.length > 0 ? (
              <img
                id="main-img"
                src={product.pictures[currentImage]}
                alt={product.name_tovara}
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
            {product.name_tovara}
            <span className={styles.atricul__text}>#{productID}</span>
            <FavoriteBorderIcon
              fontSize={"large"}
              className={styles.favorite__btn}
            />
          </div>
          <div className={styles.score__container}>
            <StarIcon className={styles.star__icon} />
            {product.score ? product.score : 0} | &nbsp;
            <p className={styles.product_score__count}>
              {product.scores_count ? product.scores_count : 0} отзывов
            </p>
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
                <p>{product.price - product.price * product.discount + "₽"}</p>
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
            <button
              className={styles.add_to_basket__btn}
              onClick={() => {
                console.log(product.score);
              }}
            >
              <ShoppingBasketIcon className={styles.basket__item} /> Добавить в
              корзину
            </button>
          </div>
          <div className={styles.color_select__container}>
            <p className={styles.color__text}>
              Цвет:{" "}
              {product.avaliable_colors ? product.avaliable_colors[0] : null}
            </p>
            <div className={styles.select_photo__container}>
              {product.avaliable_colors ? (
                <ul className={styles.select_photo__list}>
                  <li>
                    <a href="">
                      <img
                        className={styles.select__img}
                        src={product.pictures[0]}
                        alt="color"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img
                        className={styles.select__img}
                        src={product.pictures[0]}
                        alt="color"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img
                        className={styles.select__img}
                        src={product.pictures[0]}
                        alt="color"
                      />
                    </a>
                  </li>{" "}
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
                <p>Тип товара: </p>
                <p>{product.type_tovara}</p>
              </div>
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
            <div className={styles.show_all_info__container}>
              <button className={styles.show_all_info__button}>
                Показать все
              </button>
            </div>
          </div>
          <div className={styles.stock__container}>
            В наличии:{" "}
            <a href="#" className={styles.stock__link}>
              в{" "}
              {product.availability_in_stores
                ? product.availability_in_stores.length
                : null}{" "}
              магазинах
            </a>
          </div>
        </div>
      </div>
      <div className={styles.scores__title}>Отзывы</div>
      <div className={styles.scores__container}>
        <div className={styles.scores_info__container}>
          <div className={styles.scores__list}>
            <p className={styles.main_score__title}>Рейтинг покупателей: </p>
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
            <button className={styles.leave_review__btn}>
              {" "}
              Оставить отзыв
            </button>
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
                      value={item.score || 0} // Используем item.score для получения рейтинга
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
                      <p>
                        {item.comment}{" "}
                        {/* Используем item.comment для отображения комментария */}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
