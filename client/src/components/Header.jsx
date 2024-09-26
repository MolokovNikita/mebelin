import styles from '../styles/header.module.css'
export default function Header(){
    return(
        <header>
            <div className={styles.top__header}>
                <div className={styles.top_left__container}>
                    <p className={styles.city__label}><a href="#">г. Москва</a> </p>
                </div>
                <div className={styles.top_right__container}>
                    <ul className={styles.top_right__list}>
                        <li><a href="#">Магазины</a></li>
                        <li><a href="#">Доставка</a></li>
                        <li><a href="#">+7-999-99-99-999</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom__header}>
                <a href="#">
                    <img className={styles.logo} src='logo.jpeg'/>
                </a>
                <div className={styles.left__container}>
            <ul className={styles.left_nav__list}>
                <li>
                    <a href="#">Каталог</a>
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
                        <li>
                            <a href="#">Избранное</a>
                        </li>
                        <li>
                            <a href="#">Войти</a>
                        </li>
                        <li>
                           <a href="#">Корзина</a> 
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}