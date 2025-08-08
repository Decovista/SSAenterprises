import React from "react";
import HeroSection from "../../Components/Hero-section/HeroSection";
import LogoCarousel from "../../Components/logo-crousel/LogoCrousel";
import ProductBox from "../../Components/ProductBox/ProductBox";
import MiddleBanner from "../../Components/middleBanner/MiddleBanner";
import BestSeller from "../../Components/BestSeller/BestSeller";
import ExcelClaims from "../../Components/ExcelClaims/ExcelClaims";
import Testimonials from "../../Components/Testimonials/Testimonials";

function Home() {
  return (
    <div className="Home">
      <HeroSection />
      <LogoCarousel />
      <BestSeller/>
      <ExcelClaims/>
      <ProductBox/>
      <MiddleBanner/>
      <Testimonials/>
    </div>
  );
}

export default Home;
