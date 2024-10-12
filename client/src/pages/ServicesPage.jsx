import styles from "../styles/services.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get(`${config.API_URL}/service`).then((res) => {
      setServices(res.data);
    });
  }, []);
  return (
    <div className={styles.content__wrap}>
      <div className={styles.services__title}>Услуги</div>
      <div className={styles.services__container}>
        {services.map((service, index) => (
          <div key={service.id} className={styles.service}>
            <ul className={styles.services__list}>
              <li>
                <span className={styles.service__name}>{service.name}</span>
              </li>
              <li>
                <span className={styles.service__price}>
                  {service.description}
                </span>
              </li>
              <li>
                <span className={styles.service__price}>{service.price}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
