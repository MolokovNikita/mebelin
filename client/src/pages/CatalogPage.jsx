import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "../styles/catalog.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

export default function CatalogPage() {
  const [productsTypes, setProductsTypes] = useState([]); // done
  useEffect(() => {
    axios
      .get(`${config.API_URL}/main_category`)
      .then((res) => {
        const resultArray = res.data.map((item) => {
          return {
            ...item,
            photo: `http://localhost:5003/uploads/product_type_pictures/${item.route}.png`,
          };
        });
        setProductsTypes(resultArray);
      })
      .catch((e) => console.error(e));
  }, []);

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
            <Grid size={3} key={productType.id_main_category}>
              <Link to={`/catalog/${productType.route}`}>
                <Item className={styles.grid__item}>
                  <img
                    src={productType.photo}
                    alt={productType.name_main_category}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <h3>{productType.name_main_category}</h3>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
