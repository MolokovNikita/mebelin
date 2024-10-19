import { useState } from "react";
import styles from "../styles/main-content.module.css";
export default function MainContent() {
  const [faqOpen, setFaqOpen] = useState([false, false, false]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const toggleFaq = (index) => {
    const newFaqOpen = [...faqOpen];
    newFaqOpen[index] = !newFaqOpen[index];
    setFaqOpen(newFaqOpen);
  };
  return (
    <>
      <div className={styles.topic__container}>
        <div className={styles.first_topic__block}>
          <div className={styles.first_topic_content__wrap}>
            <p className={styles.first_topic_main__text}>
              Мебель от <br />
              фабрики
            </p>
            <p className={styles.first_topic_secondary__text}>
              Мебель от фабрики - качество и стиль
            </p>
            <button onClick={()=>{setIsPopUpOpen(true)}} className={styles.submit__btn}>Оставить заявку</button>
            {isPopUpOpen ? 
              <div className={styles.popup__container}>
                <div className={styles.popup__content}>
                  <div className={styles.popup__close}>
                    <button onClick={()=>{setIsPopUpOpen(false)}} className={styles.close__btn}>
                    <img src="/close.png" alt="close" className={styles.closeImage} />
                    </button>
                  </div>
                      <form className={styles.popup__form}>
                        <input type="text" placeholder="Ваше имя" className={styles.popup__input}/>
                        <input type="tel" placeholder="Ваш номер телефона" className={styles.popup__input}/>
                        <button className={styles.popup__submit}>Оставить заявку</button>
                      </form>
                      </div>
                      </div>
             : null}

            <div className={styles.topic_block__container}>
              <div className={styles.first_block__info}>
                <p>
                  <img src="verify.png" alt="" />
                </p>
                <h3 style={{ fontWeight: 800, fontSize: 20 }}>
                  <strong>1000+</strong>
                </h3>
                <p>
                  Клиентов доверяют нашей <br />
                  компании
                </p>
              </div>
              <div className={styles.second_block__info}>
                <p>
                  <img src="arrow.png" alt="" />
                </p>
                <p style={{ fontWeight: 800, fontSize: 20 }}>
                  <strong>2460+</strong>
                </p>
                <p>
                  Успешно доставленных <br />
                  товаров
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.second_topic__block}>
          <img
            className={styles.second_topic_main__image}
            src="/general-image.webp"
            alt="image"
          />
        </div>
      </div>
      <div className={styles.second_topic__container}>
        <div className={styles.second_topic_first__block}>
          <h3 className={styles.second_topic_first__text}>
            Быстрая Доставка Мебели
          </h3>
          <div className={styles.second_topic_second__container}>
            <p>
              Быстрая обработка заказов и оперативная доставка товаров клиентам
              - наши приоритеты!
            </p>
            <img src="verify.png" alt="verifyImage" />
          </div>
        </div>
        <div className={styles.second_topic_second__block}>
          <h3 className={styles.second_topic_second__text}>
            Гарантия Качества Мебели
          </h3>
          <div className={styles.second_topic_second__container}>
            <p>Гарантия высокого качества продукции - наш приоритет!</p>
            <img src="arrow.png" alt="arrowImage" />
          </div>
        </div>
        <div className={styles.second_topic_third__block}>
          <h3 className={styles.second_topic_third__text}>
            Качество превыше всего
          </h3>
          <div className={styles.second_topic_second__container}>
            <p>
              Высококлассная команда профессионалов гарантирует индивидуальный
              подход к каждому клиенту!
            </p>
            <img src="security.png" alt="secureImage" />
          </div>
        </div>
      </div>
      <div className={styles.client_score__topic}>
        <h2>Отзывы довольных клиентов</h2>
      </div>
      <div className={styles.client_score__text}>Отзывы довольных клиентов</div>
      <div className={styles.client_scores__container}>
        <div className={styles.first_score}>
          <div className={styles.score_first__item}>
            <img
              className={styles.first_client__avatar}
              src="man-ava.png"
              alt="client1Image"
            />
            <div>
              Владислав Макаров
              <ul className={styles.score_star__list}>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.first_score__title}>
            Очень доволен покупкой дивана в магазине мебельной фабрики!
          </div>
          <div className={styles.first_score__text}>
            Отличная работа! <br />Я доволен покупкой мебели из вашего магазина.
            Менеджер был очень вежливым и помог мне выбрать подходящий вариант.
            Качество продукции высокое, доставка была быстрой. Спасибо!
          </div>
        </div>

        <div className={styles.second_score}>
          <div className={styles.score_second__item}>
            <img
              className={styles.second_client__avatar}
              src="woman-ava.png"
              alt="client1Image"
            />
            <div>
              Екатерина Корнеева
              <ul className={styles.score_star__list}>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
                <li>
                  <img src="star.jpg" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.second_score__title}>
            Спасибо за уютную обстановку!
          </div>
          <div className={styles.second_score__text}>
            Очень довольна покупкой дивана в магазине мебельной фабрики! <br />
            Качество материалов отличное, а цена приятно удивила. Обслуживание
            также было на высоте - консультант помог выбрать подходящую модель и
            ответил на все мои вопросы.
          </div>
        </div>
      </div>
      <div className={styles.often_question__title}>
        <h2>Частые вопросы</h2>
      </div>
      <div className={styles.often_question__text}>
        Часто задаваемые вопросы
      </div>

      <div className={styles.faq_container}>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(0)}>
            Какова скорость выполнения заказов вашей компанией?
            <span>{faqOpen[0] ? "-" : "+"}</span>
          </div>
          {faqOpen[0] && (
            <div className={styles.faq_answer}>
              Мы всегда стремимся выполнять свою работу быстро и качественно!
              Обращайтесь - мы готовы помочь вам в любое время!
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(1)}>
            Какой регион охватывает ваш магазин?
            <span>{faqOpen[1] ? "-" : "+"}</span>
          </div>
          {faqOpen[1] && (
            <div className={styles.faq_answer}>
              Мы всегда стремимся выполнять свою работу быстро и качественно!
              Обращайтесь - мы готовы помочь вам в любое время!{" "}
            </div>
          )}
        </div>
        <div className={styles.faq_item}>
          <div className={styles.faq_question} onClick={() => toggleFaq(2)}>
            Какой регион обслуживания у вашей компании? - этот вопрос мы
            получаем довольно часто от наших клиентов. Мы работаем только в
            пределах города Москва и Московской области.{" "}
            <span>{faqOpen[2] ? "-" : "+"}</span>
          </div>
          {faqOpen[2] && (
            <div className={styles.faq_answer}>
              Мы обеспечиваем высокое качество продукции благодаря использованию
              современных технологий производства и строгому контролю качества
              на каждом этапе работы. Если клиент остался недовольным
              результатом, мы готовы рассмотреть все претензии и предложить
              решение проблемы.
            </div>
          )}
        </div>
      </div>
      <div className={styles.contacts_block__title}>
        <strong>Контакты</strong>
      </div>
      <div className={styles.contacts_block__container}>
        <div>
          <p>
            <strong>Связаться с нами</strong>
          </p>
          <p>+7 495 362-72-86</p>
          <p>KorneevVA@mpei.ru</p>
        </div>
        <div>
          <p>
            <strong>Наш адрес</strong>
          </p>
          <p>111250, г. Москва, ул. Красноказарменная, д.17 </p>
        </div>
        <div>
          <p>
            <strong>Время работы</strong>
          </p>
          <p> Пн-Пт: 08:00 - 20:00, Сб-Вс: 10:00 - 18:00</p>
        </div>
      </div>
    </>
  );
}
