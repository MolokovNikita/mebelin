import { useState, useEffect } from "react";
import styles from "../styles/favorites.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Getting favorite products");
    const generatedProducts = Array.from({ length: 2 }, (_, index) => ({
      id: index + 1,
      type: "chair",
      pictures: [
        `/products_images/chair_${index + 1}/01.png`,
        `/products_images/chair_${index + 1}/02.png`,
        `/products_images/chair_${index + 1}/03.png`,
        `/products_images/chair_${index + 1}/04.png`,
      ],
      discount: 0.5,
      name_tovara: `Стул фишер`,
      price: 2500,
      score: 0,
      scores_count: 0,
      type_tovara: "Стул",
      color_tovara: "Белый",
      kach_tovara: "Среднее",
      fabrick: "Химки",
      size: "130x100x10",
      warranty: "36 месяцев",
      service_life: "10 лет",
      material: "ЛДСП",
    }));
    setProducts(generatedProducts);
  }, []);

  return (
    <div className={styles.content__wrap}>
      <p className={styles.favorite__title}>Товары, которые вам понравились</p>
      <div className={styles.favorite_list_price__container}>
        <div className={styles.favorite__price}>
          В общем, вам понравилось товаров на сумму -{" "}
          <strong>&nbsp;13032</strong>
        </div>
        <button className={styles.buy__btn}>Купить</button>
      </div>
      <div className={styles.favorites__list__container}>
        {products.map((product) => (
          <Link to={`/catalog/${product.type}/${product.id}`}>
            <div key={product.id} className={styles.item__container}>
              {/* <FavoriteBorderIcon /> */}
              <FavoriteIcon className={styles.favorite__icon} />
              <img
                src={product.pictures[0]}
                alt={product.name_tovara}
                className={styles.product__image}
              />
              <div className={styles.product__info}>
                <h3 className={styles.product__name}>{product.name_tovara}</h3>
                <p className={styles.product__discount}>
                  Скидка:{" "}
                  <span className={styles.sale__text}>
                    {product.discount * 100}%
                  </span>
                </p>
                <p className={styles.product__discount}>
                  Цвет: {product.color_tovara}
                </p>
              </div>
              <div className={styles.price__container}>
                <p className={styles.product__price}>
                  Цена: {product.price * product.discount} ₽ &nbsp;
                  <span className={styles.price_without__price}>
                    {product.price} ₽
                  </span>
                </p>
                <button className={styles.add_to_cart__btn}>В корзину</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
