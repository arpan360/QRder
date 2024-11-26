import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@qrder.com</p>
          <p>Phone: +977 1234567890</p>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 QRder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
