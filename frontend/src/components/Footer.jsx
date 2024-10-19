// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-4">
      <p>
        &copy; {new Date().getFullYear()} Bursary Management System. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
