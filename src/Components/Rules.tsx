// src/rules.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Login from "./Login";
import Register from "./Register";
import Payment from "./Payment";

;

const Rules = () => {
  return (
    <BrowserRouter>
     <Header />
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rules;
