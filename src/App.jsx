import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyProvider } from "./Context/MyContext";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import UpperNav from "./Components/Upper-nav/UpperNav";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import { useMyContext } from "./Context/MyContext";
import AddToCart from "./Components/AddToCart/AddToCart";
import Checkout from "./Pages/Checkout/Checkout";
import Payment from "./Pages/PaymentPage/Payment";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";
import SearchResults from "../src/Components/SearchResults/SearchResults";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Page from "./Pages/Page/Page";
import MainLoader from "./Pages/MainLoader/MainLoader";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Products from "./Pages/Products/Products";

function AppContent() {
  const { popCart } = useMyContext();
  const [PageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {PageLoading ? (
        <MainLoader />
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          <UpperNav />
          <Navigation />
          <Routes>
            <Route path="/products" element={<Products/>} />
            <Route path="/login" element={<Login />} />
            <Route path='AddTo' element={<AddToCart />} />
            <Route path="/details/:productId" element={<ProductDetail />} />
            <Route path="/:pageId" element={<Page />} />
            <Route path="/" element={<Home />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/ThankYou" element={<SuccessPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/About" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}
const App = () => {
  return (
    <>
      <MyProvider>
        <AppContent />
      </MyProvider>
    </>
  );
};

export default App;
