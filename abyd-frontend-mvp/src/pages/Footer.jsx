import React from 'react';
import './Footer.css';
import datence from '../assets/Datence.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <a href="#privacy-policy" className="footer__link">Privacy Policy</a>
          <a href="#support" className="footer__link">Support</a>
          <a href="#social-media" className="footer__link">Social Media</a>
        </div>
        <p className="footer__copy">&copy; 2024 Datence. All rights reserved.</p>
      </div>
      <div className="datence-card2">
        <img src={datence} alt="Datence Logo" />
      </div>
    </footer>
  );
}

export default Footer;
