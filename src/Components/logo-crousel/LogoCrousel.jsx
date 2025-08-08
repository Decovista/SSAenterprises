import React from "react";
import "./logoCrousel.css";
import asstes from "../../assets/asstes";

const logos = [
  { id: 1, name: "TCS", img: asstes.brand1 },
  { id: 2, name: "Infosys", img: asstes.brand2 },
  { id: 3, name: "Wipro", img: asstes.brand3 },
  { id: 4, name: "Reliance", img: asstes.brand4 },
  { id: 5, name: "HCL", img: asstes.brand5 },
];

const LogoCarousel = () => {
  // Duplicate the array for smooth loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-carousel-wrapper">
      <div className="logo-track">
        {duplicatedLogos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img src={logo.img} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
