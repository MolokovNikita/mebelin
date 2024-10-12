import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import styles from "../styles/favorites.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { basket, setBasket, favoritesList, setFavoritesList } =
    useContext(ProductsContext);
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
  const checkProductInCard = (product) => {
    const existingProductIndex = basket.findIndex(
      (item) => item.id_tovar === product.id_tovar,
    );
    if (existingProductIndex !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const handleBuy = () => {
    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket];

      favoritesList.forEach((favorite) => {
        const existingItemIndex = updatedBasket.findIndex(
          (item) => item.id_tovar === favorite.id_tovar,
        );

        if (existingItemIndex !== -1) {
          // Если товар уже в корзине, увеличиваем количество
          updatedBasket[existingItemIndex].quantity += 1;
        } else {
          // Если товара нет в корзине, добавляем его с quantity = 1
          updatedBasket.push({
            ...favorite,
            quantity: 1,
          });
        }
      });

      return updatedBasket;
    });
    navigate("/basket");
  };

  return (
    <div className={styles.content__wrap}>
      <ToastContainer />
      <p className={styles.favorite__title}>Товары, которые вам понравились</p>
      <div className={styles.favorite_list_price__container}>
        <div className={styles.favorite__price}>
          В общем, вам понравилось товаров на сумму -{" "}
          <strong>
            &nbsp;
            {favoritesList
              .reduce((acc, item) => acc + item.price * (1 - item.discount), 0)
              .toFixed(2)}
          </strong>
        </div>
        <button onClick={handleBuy} className={styles.buy__btn}>
          Купить
        </button>
      </div>
      <div className={styles.favorites__list__container}>
        {favoritesList.map((product) => (
          <Link
            to={`/catalog/${product.type_tovara}/${product.id_tovar}`}
            key={product.id_tovar}
          >
            <div className={styles.item__container}>
              {/* <FavoriteBorderIcon /> */}
              <div
                className={styles.favorite__icon}
                onClick={(event) => {
                  removeFromFavorites(product, event);
                }}
              >
                <FavoriteIcon />
              </div>
              <img
                src={product.pictures[0]}
                alt={product.name_tovar}
                className={styles.product__image}
              />
              <div className={styles.product__info}>
                <h3 className={styles.product__name}>{product.name_tovar}</h3>
                {product.discount ? (
                  <p className={styles.product__discount}>
                    Скидка:{" "}
                    <span className={styles.sale__text}>
                      {product.discount * 100}%
                    </span>
                  </p>
                ) : null}
                <p className={styles.product__discount}>
                  Цвет: {product.color}
                </p>
              </div>
              <div className={styles.main_info__container}>
                <div className={styles.price__container}>
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
                          {product.price - product.price * product.discount} ₽
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
                </div>
                {checkProductInCard(product) === true ? (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      navigate("/basket");
                    }}
                    className={styles.enter_to_basket__btn}
                  >
                    Перейти в корзину
                  </button>
                ) : (
                  <button
                    className={styles.add_to_cart__btn}
                    onClick={(event) => {
                      addToCart(product, event);
                    }}
                  >
                    Добавить в корзину
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
