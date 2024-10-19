import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";
import styles from "../styles/header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Link } from "react-router-dom";
export default function Header(props) {
  const { setIsOpen } = props;
  const { handleLogOut, isAuth, userData } = useContext(AuthContext);
  const { basket, favoritesList } = useContext(ProductsContext);

  const handleClose = () => {
    console.log("logout");
    handleLogOut();
  };
  return (
    <header>
      <div className={styles.top__header}>
        <div className={styles.top_left__container}>
          {/* <p className={styles.city__label}>
            <a href="#">
              <FmdGoodOutlinedIcon fontSize="small" />
              г. Москва
            </a>{" "}
          </p> */}
        </div>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>
            {/* <li>
              <a href="#">Магазины</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li> */}
            <li>
              <a href="#">+7 495 362-72-86</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom__header}>
        <Link to="/">
          <img className={styles.logo} src="/logo.jpeg" />
        </Link>
        <div className={styles.left__container}>
          <ul className={styles.left_nav__list}>
            <li className={styles.catalor__item}>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li className={styles.sales__item}>
              <Link to="/sales">Скидки</Link>
            </li>
            <li className={styles.services__item}>
              <Link to="/services">Услуги</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right__container}>
          <ul className={styles.right_nav__list}>
            <li className={styles.favorite__item}>
              <Link to="/favorites">
                <FavoriteBorderOutlinedIcon fontSize="large" />
                Избранное
                <div className={styles.favorites__counter}>
                  {favoritesList.reduce((acc) => acc + 1, 0)}
                </div>
              </Link>
            </li>
            <li className={styles.sign__item}>
              {isAuth ? (
                <>
                  <button className={styles.auth__block}>
                    <AccountCircleOutlinedIcon fontSize="large" />
                    {userData.f_name}
                  </button>
                  <div className={styles.pop_up__bg}>
                    <div className={styles.pop_up}>
                      <ul className={styles.pop_up__list}>
                        <li>Привет!</li>
                        <li>Заказы</li>
                        <li
                          className={styles.logout__item}
                          onClick={handleClose}
                        >
                          Выйти
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <AccountCircleOutlinedIcon fontSize="large" />
                  Войти
                </button>
              )}
            </li>
            <li className={styles.basket__item}>
              <Link to="/basket">
                <ShoppingBasketOutlinedIcon fontSize="large" />
                Корзина
                <div className={styles.basket__counter}>
                  {basket.reduce((acc) => acc + 1, 0)}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
