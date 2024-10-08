import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "../styles/sales.module.css"; // Подключаем стили для страницы скидок
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const [currentImageIndices, setCurrentImageIndices] = useState({});

  useEffect(() => {
    const generatedProducts = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      type: "chair",
      pictures: [
        `/products_images/chair_${index + 1}/01.png`,
        `/products_images/chair_${index + 1}/02.png`,
        `/products_images/chair_${index + 1}/03.png`,
        `/products_images/chair_${index + 1}/04.png`,
      ],
      discount: 0.5,
      name_tovara: `Стул фишер ${index + 1}`,
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
    const initialImageIndices = generatedProducts.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {});
    setCurrentImageIndices(initialImageIndices);
  }, []);

  const addToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    setCart([...cart, product]);
    alert(`${product.name_tovara} добавлен в корзину`);
  };

  const addToFavorites = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    setFavorites([...favorites, product]);
    alert(`${product.name_tovara} добавлен в избранное`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevImage = (productId, event) => {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    const currentIndex = currentImageIndices[productId] || 0;
    const totalImages =
      products.find((item) => item.id === productId)?.pictures.length || 0;
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;

    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [productId]: prevIndex,
    }));
  };

  const handleNextImage = (productId, event) => {
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    const currentIndex = currentImageIndices[productId] || 0;
    const totalImages =
      products.find((item) => item.id === productId)?.pictures.length || 0;
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
      <div className={styles.sales__container}>Скидки</div>
      <Grid container spacing={6} className={styles.products__container}>
        {products
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage,
          )
          .map((product) => (
            <Grid size={3} key={product.id}>
              <Link to={`/catalog/${product.type}/${product.id}`}>
                <Item className={styles.product__item}>
                  <div className={styles.image__slider}>
                    <ArrowBackIosIcon
                      className={styles.left__arrow}
                      onClick={(event) => handlePrevImage(product.id, event)}
                    />
                    <img
                      className={styles.product__image}
                      src={
                        product.pictures[currentImageIndices[product.id] || 0]
                      }
                      alt={`${product.name_tovara}`}
                    />
                    <ArrowForwardIosIcon
                      className={styles.right__arrow}
                      onClick={(event) => handleNextImage(product.id, event)}
                    />
                  </div>
                  <div className={styles.image__dots}>
                    {product.pictures.map((_, index) => (
                      <span
                        key={index}
                        className={
                          currentImageIndices[product.id] === index
                            ? styles.active__dot
                            : styles.dot
                        }
                      ></span>
                    ))}
                  </div>
                  <div className={styles.product_discount__price}>
                    <p>{product.price - product.price * product.discount} ₽</p>
                    <p className={styles.price__without_discount}>
                      {product.price} ₽
                    </p>
                    <p className={styles.sales__badge}>
                      - {product.discount * 100} %
                    </p>
                  </div>
                  <p className={styles.product__description}>
                    {product.name_tovara}, {product.size}, {product.material},{" "}
                    {product.color_tovara}, {product.fabrick},{" "}
                    {product.warranty}
                  </p>
                  <div className={styles.product__score}>
                    <StarIcon className={styles.star__icon} />
                    {product.score ? product.score : 0} | &nbsp;
                    <p className={styles.product_score__count}>
                      {product.scores_count ? product.scores_count : 0} отзывов
                    </p>
                  </div>
                  <button
                    className={styles.basket__button}
                    onClick={(event) => addToCart(product, event)}
                  >
                    Добавить в корзину
                  </button>
                  <button
                    className={styles.favorites__button}
                    onClick={(event) => addToFavorites(product, event)}
                  >
                    <FavoriteBorderIcon />
                  </button>
                </Item>
              </Link>
            </Grid>
          ))}
      </Grid>
      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? styles.activePage : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
