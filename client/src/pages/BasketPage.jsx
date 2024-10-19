import { useState, useContext } from "react";
import styles from "../styles/basket.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function BasketPage() {
  const { favoritesList, setFavoritesList, basket, setBasket } =
    useContext(ProductsContext);
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
  const changeQuantity = (event, id, color, delta) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) => {
      return prevBasket.map((item) =>
        item.id_tovar === id && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      );
    });
  };

  const removeProduct = (event, id, color) => {
    event.stopPropagation();
    event.preventDefault();
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.id_tovar !== id || item.color !== color),
    );
  };

  const calculateTotalPrice = () => {
    return basket.reduce(
      (total, product) =>
        product.selected
          ? total +
            product.price *
              (product.discount ? product.discount : 1) *
              product.quantity
          : total,
      0,
    );
  };

  const totalPrice = calculateTotalPrice();

  const toggleSelect = (event, id, color) => {
    event.stopPropagation();
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id_tovar === id && item.color === color
          ? { ...item, selected: !item.selected }
          : item,
      ),
    );
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
  return (
    <div className={styles.content__wrap}>
      <ToastContainer />
      <h1 className={styles.basket__title}>Корзина</h1>
      <div className={styles.main__page}>
        {basket.length > 0 ? (
          <>
            <div className={styles.basket__container}>
              {basket.map((product) => (
               <div key={product.id_tovar + product.color}>
                <Link
                to={`/catalog/${product.type_tovara}/${product.id_tovar}`}
                

              >
                <div
                  className={styles.basket__block}
                >
                  <input
                    type="checkbox"
                    checked={product.selected || false}
                    onChange={(event) =>
                      toggleSelect(event, product.id_tovar, product.color)
                    }
                    onClick={(event)=>{   
                      event.stopPropagation();
                      }}
                    className={styles.product__checkbox}
                  />
                  <img
                    src={product.pictures[0]}
                    alt={product.name_tovar}
                    className={styles.product__image}
                  />
                  <div className={styles.product__info}>
                    <div className={styles.product_info__name}>
                      <h3 className={styles.product__name}>
                        {product.name_tovar}
                      </h3>
                      <p className={styles.color__text}>
                        цвет: {product.color}
                      </p>
                      <p className={styles.articul__text}>
                        артикул: #{product.id_tovar}
                      </p>
                    </div>
                    <div className={styles.product__quantity_controls}>
                      <div className={styles.product__quantity_btn}>
                        <button
                          onClick={(event) =>
                            changeQuantity(event, product.id_tovar, product.color, -1)
                          }
                          className={styles.quantity_btn}
                        >
                          -
                        </button>
                        <span className={styles.product__quantity}>
                          {product.quantity}
                        </span>
                        <button
                          onClick={(event) =>
                            changeQuantity(event, product.id_tovar, product.color, 1)
                          }
                          className={styles.quantity_btn}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles.product_info__price}>
                      <p className={styles.product__price}>
                        {product.price *
                          (product.discount ? 1 - product.discount : 1) *
                          product.quantity}{" "}
                        ₽
                      </p>
                      {product.discount ? (
                        <div className={styles.product__discount__container}>
                          <p>
                            <span className={styles.product__discount}>
                              {product.price * product.quantity}₽
                            </span>
                          </p>
                          <p>
                            <span className={styles.product__discount__badge}>
                              - {product.discount * 100}%
                            </span>
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.product_info__buttons}>
                      <button
                        onClick={(event) =>
                          removeProduct(event, product.id_tovar, product.color)
                        }
                        className={styles.remove__btn}
                      >
                        <DeleteIcon />
                      </button>
                      {checkProductFavorite(product) == false ? (
                        <button
                          className={styles.favorite__btn}
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
                    </div>
                  </div>
                </div>
                </Link>
                     </div>   
              ))}
            </div>
            <div className={styles.basket_total__info}>
              Итого: <strong>{totalPrice} ₽</strong>
              <button onClick={()=>{
                if(totalPrice){
                  setBasket([]);
                  alert('Вы успешно оформили заказ!');
                }
                else{
                  return;
                }
                }} className={styles.buy__btn}>Оформить заказ</button>
            </div>
          </>
        ) : (
          <div>
            <h3>Ваша корзина пуста</h3>
            <p>Найдите всё, что нужно в нашем каталоге</p>
            <div className={styles.catalog_btn__container}>
              <Link className={styles.catalog__btn} to="/catalog">
                В каталог
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
