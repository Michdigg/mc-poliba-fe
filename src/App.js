import * as React from 'react';
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./Components/Orders";
import ShoppingCart from "./Components/ShoppingCart";


function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="orders" element={<Orders />}></Route>
                  <Route path="shoppingCart" element={<ShoppingCart />}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
