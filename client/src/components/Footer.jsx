import styles from "../styles/footer.module.css";
export default function Footer() {
  const now = new Date().getFullYear();
  return <footer>{now} все права защищены.</footer>;
}
