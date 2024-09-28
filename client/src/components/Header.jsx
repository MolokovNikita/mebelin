import styles from "../styles/header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

export default function Header(props) {
const{setIsOpen} =props;
  return (
    <header>
      <div className={styles.top__header}>
        <div className={styles.top_left__container}>
          <p className={styles.city__label}>
            <a href="#">
              <FmdGoodOutlinedIcon fontSize="small" />
              г. Москва
            </a>{" "}
          </p>
        </div>
        <div className={styles.top_right__container}>
          <ul className={styles.top_right__list}>
            <li>
              <a href="#">Магазины</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
            <li>
              <a href="#">+7 495 362-72-86</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom__header}>
        <a href="#">
          <img className={styles.logo} src="logo.jpeg" />
        </a>
        <div className={styles.left__container}>
          <ul className={styles.left_nav__list}>
            <li className={styles.catalor__item}>
              <a href="#">
                <MenuIcon />
                Каталог
              </a>
            </li>
            <li>
              <a href="#">Скидки</a>
            </li>
            <li>
              <a href="#">Услуги</a>
            </li>
          </ul>
        </div>
        <div className={styles.right__container}>
          <ul className={styles.right_nav__list}>
            <li className={styles.favorite__item}>
              <a href="#">
                <FavoriteBorderOutlinedIcon fontSize="large" />
                Избранное
              </a>
            </li>
            <li className={styles.sign__item}>
              <a href="#" onClick={()=>{setIsOpen(true)}}>
                <AccountCircleOutlinedIcon fontSize="large" />
                Войти
              </a>
            </li>
            <li className={styles.basket__item}>
              <a href="#">
                <ShoppingBasketOutlinedIcon fontSize="large" />
                Корзина
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
