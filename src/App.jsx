import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Ultiles/Store";
import Navbar from "./component/Navbar";
import Singleproduct from "./component/Singleproduct.jsx";
import Home from "./component/Home.jsx";
import Cart from "./component/Cart.jsx";
import Stepper from "./component/Stepper.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Search from "./component/Search.jsx";
import Footer from "./component/Footer.jsx";
import PopUp from "./component/PopUp.jsx";
import { googleTranslateElementInit } from './component/GoogleTranslate.jsx';


function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  // Open the language selection popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Close the language selection popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    googleTranslateElementInit(language);
  };

 
  

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/checkout" element={<Stepper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<Singleproduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
        {/* {showPopup && (
          <PopUp onClose={handleClosePopup} onLanguageChange={handleLanguageChange} />
        )} */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
