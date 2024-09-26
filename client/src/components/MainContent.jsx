import styles from '../styles/main-content.module.css'
export default function MainContent(){
    return(
        <>
        <div className={styles.topic__container}>
            <div className={styles.first_topic__block}>
                <div className={styles.first_topic_content__wrap}>
                <p className={styles.first_topic_main__text}>Мебель от <br />фабрики</p>
                <p className={styles.first_topic_secondary__text}>Мебель от фабрики - качество и стиль</p>
                <button className={styles.submit__btn}>Оставить заявку</button>
                <div className={styles.topic_block__container}>
                    <div className={styles.first_block__info}>
                        <p>img</p>
                        <p style={{fontWeight: 500, fontSize: 20}}><strong>1000+</strong></p>
                        <p>Клиентов доверяют нашей <br />
                            компании</p>
                        </div>
                    <div className={styles.second_block__info}>
                    <p>img</p>
                        <p style={{fontWeight: 500, fontSize: 20}}><strong>2460+</strong></p>
                        <p>Успешно доставленных <br />
                        товаров</p>
                        </div>
                </div>
                </div>
            </div>
            <div className={styles.second_topic__block}>
                <img  className={styles.second_topic_main__image}src="/general-image.webp" alt="image" />
            </div>
        </div>
        </>
    )
}