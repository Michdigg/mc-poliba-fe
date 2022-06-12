import * as React from 'react';
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./Components/Orders";
import ShoppingCart from "./Components/ShoppingCart";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {useCallback, useContext, useEffect} from "react";
import {UserContext} from "./context/UserContext";


function App() {

    const [userContext, setUserContext] = useContext(UserContext)

    const verifyUser = useCallback(() => {
        fetch("http://localhost:8080/refreshToken", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json()
                setUserContext(oldValues => {
                    return { ...oldValues, token: data.token }
                })
            } else {
                setUserContext(oldValues => {
                    return { ...oldValues, token: null }
                })
            }
            // call refreshToken every 5 minutes to renew the authentication token.
            setTimeout(verifyUser, 5 * 60 * 1000)
        })
    }, [setUserContext])

    useEffect(() => {
        verifyUser()
    }, [verifyUser])

  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="orders" element={<Orders />}></Route>
                  <Route path="shoppingCart" element={<ShoppingCart />}></Route>
                  <Route path="login" element={<Login />}></Route>
                  <Route path="signUp" element={<SignUp />}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
