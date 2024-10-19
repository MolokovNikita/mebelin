import styles from '../styles/review-popUp.module.css';
import Rating from "@mui/material/Rating";
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import config from '../config/config';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReviewPopUp(props) {
  const { productId, onClose } = props;
  const { handleLogOut, isAuth, userData } = useContext(AuthContext);
  const [reviewScore, setReviewScore] = useState(0);
  const reviewText = useRef('');
  const notify = (type,errorText) =>{
    if(type === 'success'){
    toast.success(`Ваш отзыв успешно опубликован!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.toast_msg,
    });
}
else{
    toast.error(`Упс, кажется произшола какая-то ошибка! ${errorText}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: styles.toast_msg,
});
}}
  useEffect(() => {
    document.body.classList.add(styles.no_scroll);
    return () => {
      document.body.classList.remove(styles.no_scroll);
    };
  }, []);
  const handleScoreSubmit = (event) => { 
    event.preventDefault();
    if(!reviewScore || !reviewText.current.value ||!userData.id || !userData.f_name || !productId)
        return notify('error','Заполните обязательные поля!');
    axios.post(`${config.API_URL}/reviews`,{
        user_id: userData.id,
         user_name: userData.f_name,
        user_surname:userData.l_name ? userData.l_name : null,
        score:reviewScore,
        comment:reviewText.current.value,
        tovar_id: productId
    })
    .then((res)=>{
        notify('success');
        setTimeout(()=>{
            onClose();
        },2000);

    }
)
    .catch((e)=>{
        notify('error');
        setTimeout(()=>{
            onClose();
        },2000);
    })
  }
  return (
    <div className={styles.review_pop_up__background} onClick={() => { onClose(); }}>
                <ToastContainer />
      <div className={styles.review_pop_up__content} onClick={(event) => {
        event.stopPropagation();
      }}>
         <div className={styles.close}>
          <button className={styles.closeButton} onClick={onClose}>
            <img src="/close.png" alt="close" className={styles.closeImage} />
          </button>
        </div>
      <div className={styles.score__container}>
      <Rating
          className={styles.rating__scale}
          name="half-rating-read"
          size='large'
          precision={0.5}
          value={reviewScore}
          onChange={(event, newValue) => {
            setReviewScore(newValue);
          }}
        />
      </div>
      <form className={styles.inputs__container}>
        <textarea
        className={styles.review__textarea}
        placeholder="Напишите ваш отзыв здесь....."
        ref={reviewText}
        />
        <button onClick = {(event)=>{handleScoreSubmit(event)}} className={styles.submit__button}>Оставить отзыв</button>
      </form>
      </div>
    </div>
  );
}
