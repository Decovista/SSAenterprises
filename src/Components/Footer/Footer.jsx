import React from "react";
import "./Footer.css"; 
import './Footer.css'
import asstes from "../../assets/asstes";
import {Link} from 'react-router-dom'

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo"> 
           <img className="footer-logo" src={asstes.mainSiteLogo} alt="Logo" />
          </div>
          <p className="description">
           At SSA, we empower homes, businesses, and industries with top-quality electrical, plumbing, solar, and infrastructure materials—delivered with reliability, backed by expertise, and built for lasting performance.
          </p>
          <div className="social-icons">
            <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
          </div>
        </div>

        <div className="footer-center">
          <h4>Site Map</h4>
           <ul>
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/technology">Technology</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/resources">Resources & news</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/About">Team</Link>
              </li>
            </ul>
        </div>

        <div className="footer-center">
          <h4>Categories</h4>
          <ul>
              <li>
                <Link to="/electrical">Electrical</Link>
              </li>
              <li>
                <Link to="/plumbing">Plumbing</Link>
              </li>
              <li>
                <Link to="/solar">Solar</Link>
              </li>
              <li>
                <Link to="/other">Other</Link>
              </li>
            </ul>
        </div>

        <div className="footer-right">
          <h4>Legal</h4>
           <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Services</Link>
              </li>
            </ul>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop}>
        ⬆ BACK TO TOP
      </button>

      <div className="footer-bottom">
        <p>Copyright © 2024, SSA Enterprises, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
