import { useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "../styles/catalog.module.css";
import { Link } from "react-router-dom";
export default function CatalogPage() {
  const [productsTypes] = useState([
    {
      id: 1,
      name: "Столы и стулья",
      photo: "products_type_images/chair.png",
      route: "chair",
    },
    {
      id: 2,
      name: "Кровати и матрасы",
      photo: "products_type_images/bed.png",
      route: "bed",
    },
    {
      id: 3,
      name: "Диваны и кресла",
      photo: "products_type_images/sofa.png",
      route: "sofa",
    },
    {
      id: 4,
      name: "Шкафы и стеллажи",
      photo: "products_type_images/wardrobe.png",
      route: "wardrobe",
    },
    {
      id: 5,
      name: "Кухонные гарнитуры",
      photo: "products_type_images/kitchen.png",
      route: "kitchen",
    },
  ]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    justifyContent: "center",
    textAlign: "center",
    fontFamily: '"Nunito", sans-serif',
    borderRadius: "20px",
    transition: "all 0.3s",
  }));

  return (
    <>
      <div className={styles.catalog__title}>Каталог</div>
      <div className={styles.grid__container}>
        <Grid container spacing={6}>
          {productsTypes.map((productType) => (
            <Grid size={3} key={productType.id}>
              <Link to={`/catalog/${productType.route}`}>
                <Item className={styles.grid__item}>
                  <img
                    src={productType.photo}
                    alt={productType.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <h3>{productType.name}</h3>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
