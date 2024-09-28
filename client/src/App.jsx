import { useState } from "react";
import MainPage from "./pages/MainPage.jsx";
import "./styles/App.css";
import ModalAuth from "./components/authModal/ModalAuth.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ModalAuth isOpen={isOpen} onClose={handleModalClose} />
      <MainPage setIsOpen={setIsOpen}/>
    </>
  );
}

export default App;
