import styles from "../styles/services.module.css";
import { useState, useEffect } from "react";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    console.log("Fetching");
    const res = [
      {
        id: 1,
        name: "Service 1",
        description: "This is service 1",
        price: 1000,
      },
      {
        id: 2,
        name: "Service 2",
        description: "This is service 2",
        price: 2000,
      },
      {
        id: 3,
        name: "Service 3",
        description: "This is service 3",
        price: 3000,
      },
    ];
    setServices(res);
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
