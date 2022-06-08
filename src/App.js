
import * as React from 'react';
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet , Link} from "react-router-dom";
import Orders from "./Components/Orders";


function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="orders" element={<Orders />}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
