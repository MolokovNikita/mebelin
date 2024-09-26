import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import MainContent from '../components/MainContent.jsx';
import styles from "../styles/main-page.module.css";
// import Footer from '../components/Footer.jsx'
export default function MainPage(){
    return(
        <>
      <Header />
      <div className={styles.content__wrap}>
      <MainContent/>
      <Footer/>
        </div>
     
      </>
    )
}