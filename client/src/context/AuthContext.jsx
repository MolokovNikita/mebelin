import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config/config.js";
const ResourceClient = axios.create({
  baseURL: `${config.API_URL}`,
  withCredentials: true,
});
const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erorText, setErrorText] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    f_name: "",
    l_name: "",
    p_name: "",
    email: "",
    phone_number: "",
  });

  const handleError = (data) => {
    setErrorText(data);
    setTimeout(() => {
      setErrorText("");
    }, 5000);
  };

  //   const handleFetchProtected = () => {
  //     ResourceClient.get("/clients")
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoading(true);
      AuthClient.post(`${config.API_URL}/auth/refresh`, null, {
        withCredentials: true,
      })
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
            f_name: res.data.name_client,
            l_name: res.data.surname_client,
            p_name: res.data.patronymic_client,
            email: res.data.email,
            phone_number: res.data.phone_number,
          });
          setisAuth(true);
        })
        .catch((e) => {
          console.log(e.response.data);
          setisAuth(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setisAuth(false);
        sessionStorage.clear();
        localStorage.clear();
        setUserData({
          id: "",
          f_name: "",
          l_name: "",
          p_name: "",
          email: "",
          phone_number: "",
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        window.location.href = "/";
      });
  };

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
  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data[0])
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
          f_name: res.data.name_client,
          l_name: res.data.surname_client,
          p_name: res.data.patronymic_client,
          email: res.data.email,
          phone_number: res.data.phone_number,
        });
        sessionStorage.setItem("userId", res.data.id);
        data[1]();
        setisAuth(true);
        alert(`Привет, ${res.data.name_client}`);
      })
      .catch((e) => {
        handleError(e.response.data);
        alert("Произошла ошибка!", e.response.data);
      });
  };

  // useEffect(() => {
  //   const handlePersistedLogOut = (event) => {
  //     if (event.key === "logout") {
  //       deleteToken();
  //       setisAuth(false);
  //     }
  //   };

  //   window.addEventListener("storage", handlePersistedLogOut);

  //   return () => {
  //     window.removeEventListener("storage", handlePersistedLogOut);
  //   };
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        erorText,
        isLoading,
        isAuth,
        userData,
        setIsLoading,
        setisAuth,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        setUserData,
        // handleFetchProtected,
        setErrorText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
