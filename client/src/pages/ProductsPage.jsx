import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "../styles/products.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsImagesDetail, setProductsImagesDetail] = useState([]);
  const productsPerPage = 12;

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const { category } = useParams();
  const location = useLocation();
  const [categoryName, setCategoryName] = useState(location.state?.name || "");

  useEffect(() => {
    const generatedProducts = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      pictures: [
        `/products_images/chair_${index + 1}/01.png`,
        `/products_images/chair_${index + 1}/02.png`,
        `/products_images/chair_${index + 1}/03.png`,
        `/products_images/chair_${index + 1}/04.png`,
      ],
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
    const initialImageIndices = generatedProducts.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {});
    setCurrentImageIndices(initialImageIndices);
  }, []);

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

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct,
    );

    const imagesDetails = currentProducts.map((item) => ({
      product: item.id,
      id: item.id,
    }));

    setProductsImagesDetail(imagesDetails);
  }, [products, currentPage]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name_tovara} добавлен в корзину`);
  };

  const addToFavorites = (product) => {
    setFavorites([...favorites, product]);
    alert(`${product.name_tovara} добавлен в избранное`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevImage = (productId) => {
    console.log(productId);
    const currentIndex = currentImageIndices[productId] || 0;
    const productDetails = productsImagesDetail.find(
      (item) => item.product === productId,
    );

    if (productDetails) {
      const totalImages =
        products.find((item) => item.id === productId)?.pictures.length || 0;
      const prevIndex = (currentIndex - 1 + totalImages) % totalImages;

      setCurrentImageIndices((prevIndices) => ({
        ...prevIndices,
        [productId]: prevIndex,
      }));

      console.log(
        `Previous image index for product ${productId}: ${prevIndex + 1} `,
      );
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
  };

  const handleNextImage = (productId) => {
    console.log(productId);
    const currentIndex = currentImageIndices[productId] || 0;
    const productDetails = productsImagesDetail.find(
      (item) => item.product === productId,
    );

    if (productDetails) {
      const totalImages =
        products.find((item) => item.id === productId)?.pictures.length || 0;
      const nextIndex = (currentIndex + 1) % totalImages;

      setCurrentImageIndices((prevIndices) => ({
        ...prevIndices,
        [productId]: nextIndex,
      }));

      console.log(
        `Next image index for product ${productId}: ${nextIndex + 1} `,
      );
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
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
      <div className={styles.category_name__title}>{categoryName}</div>
      <Grid container spacing={6} className={styles.products__container}>
        {products
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage,
          )
          .map((product) => (
            <Grid size={3} key={product.id}>
              <Item className={styles.product__item}>
                <div className={styles.image__slider}>
                  <ArrowBackIosIcon
                    className={styles.left__arrow}
                    onClick={() => handlePrevImage(product.id)}
                  />
                  <img
                    className={styles.product__image}
                    src={product.pictures[currentImageIndices[product.id] || 0]}
                    alt={`${product.name_tovara}`}
                  />
                  <ArrowForwardIosIcon
                    className={styles.right__arrow}
                    onClick={() => handleNextImage(product.id)}
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
                <p className={styles.product__price}>{product.price} ₽</p>
                <p className={styles.product__description}>
                  {product.name_tovara}, {product.size}, {product.material},{" "}
                  {product.color_tovara}, {product.fabrick}, {product.warranty}
                </p>
                <a className={styles.product__score}>
                  <StarIcon className={styles.star__icon} />
                  {product.score ? product.score : 0} | &nbsp;
                  <p className={styles.product_score__count}>
                    {product.scores_count ? product.scores_count : 0} отзывов
                  </p>
                </a>
                <button
                  className={styles.basket__button}
                  onClick={() => addToCart(product)}
                >
                  Добавить в корзину
                </button>
                <button
                  className={styles.favorites__button}
                  onClick={() => addToFavorites(product)}
                >
                  <FavoriteBorderIcon />
                </button>
              </Item>
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
