import { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext({});

const ProductsProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data[0])
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem(
          "accessTokenExpiration",
          accessTokenExpiration,
        );
        setUserData({
          ...userData,
          id: res.data.id,
          f_name: data[0].f_name,
          email: data[0].email,
        });
        sessionStorage.setItem("userId", res.data.id);
        data[1]();
        setisAuth(true);
        alert("Вы успешно зарегались!");
      })
      .catch((e) => {
        handleError(e.response.data);
        alert("Произошла ошибка! - ", e.response.data);
      });
  };
  useEffect(() => {
    //получение все товаров из корзины и избранных
  });
  return (
    <ProductsContext.Provider
      value={{
        basket,
        setBasket,
        favoritesList,
        setFavoritesList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
