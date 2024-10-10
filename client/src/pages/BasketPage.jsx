import { useState } from "react";
import styles from "../styles/basket.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
export default function BasketPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      pictures_count: 4,
      pictures: [`/products_images/chair_${1}/01.png`],
      discount: 0.5,
      name_tovara: `Стул фишер`,
      price: 2500,
      quantity: 1, // Количество товара
      selected: true, // Для выбора через чекбокс
    },
    {
      id: 2,
      pictures_count: 4,
      pictures: [`/products_images/chair_${2}/01.png`],
      discount: 0.3,
      name_tovara: `Стул Райт`,
      price: 3000,
      quantity: 1, // Количество товара
      selected: true, // Для выбора через чекбокс
    },
  ]);

  // Функция для удаления товара
  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Функция для изменения количества товара
  const changeQuantity = (id, amount) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + amount) } // Количество не может быть меньше 1
          : product,
      ),
    );
  };

  // Функция для выбора товара
  const toggleSelect = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product,
      ),
    );
  };

  // Подсчет итоговой суммы
  const totalPrice = products
    .filter((product) => product.selected) // Учитываются только выбранные товары
    .reduce((acc, product) => {
      return (
        acc +
        product.price *
          (product.discount ? product.discount : 1) *
          product.quantity
      );
    }, 0);

  return (
    <div className={styles.content__wrap}>
      <h1 className={styles.basket__title}>Корзина</h1>
      <div className={styles.main__page}>
        <div className={styles.basket__container}>
          {products.map((product) => (
            <div key={product.id} className={styles.basket__block}>
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => toggleSelect(product.id)}
                className={styles.product__checkbox}
              />
              <img
                src={product.pictures[0]}
                alt={product.name_tovara}
                className={styles.product__image}
              />
              <div className={styles.product__info}>
                <div className={styles.product_info__name}>
                  <h3 className={styles.product__name}>
                    {product.name_tovara}
                  </h3>
                  <p className={styles.articul__text}>Артикул: #{product.id}</p>
                </div>

                <div className={styles.product__quantity_controls}>
                  <div className={styles.product__quantity_btn}>
                    <button
                      onClick={() => changeQuantity(product.id, -1)}
                      className={styles.quantity_btn}
                    >
                      -
                    </button>
                    <span className={styles.product__quantity}>
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(product.id, 1)}
                      className={styles.quantity_btn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.product_info__price}>
                  <p className={styles.product__price}>
                    {product.price *
                      (product.discount ? product.discount : 1) *
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
                    onClick={() => removeProduct(product.id)}
                    className={styles.remove__btn}
                  >
                    <DeleteIcon />
                  </button>
                  <FavoriteIcon className={styles.favorite__icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.basket_total__info}>
          Итого: <strong>{totalPrice} ₽</strong>
          <button className={styles.buy__btn}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}
