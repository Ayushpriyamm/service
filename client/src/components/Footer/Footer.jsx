import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import "./footer.scss";

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCategoryClick = (category) => {
    navigate(`gigs?search=${category}`);
  };

  return (
    <div className="top3">
      <div className="bottom3">
        <div className="left3">
          <h2>
            <span className="service3">Service</span>Bridge
          </h2>
        </div>
        <div className="right3">
          <img src="/images/accessibility.png" alt="Accessibility Icon" />
        </div>
      </div>

      <div className="item3">
        <h2>Categories</h2>
        <div className="cat1">
          <span className="spanf3" onClick={() => handleCategoryClick("Carpenter")}>
            Carpenter
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Electrician")}>
            Electrician
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Painter")}>
            Painter
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Plumber")}>
            Plumber
          </span>
        </div>
        <div className="cat2">
          <span className="spanf3" onClick={() => handleCategoryClick("Handyman")}>
            Handyman
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Window Installer")}>
            Window Installer
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Cleaning Services")}>
            Cleaning Services
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Furniture Maker")}>
            Furniture Maker
          </span>
        </div>
        <div className="cat3">
          <span className="spanf3" onClick={() => handleCategoryClick("Welder")}>
            Welder
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Garage Door Technician")}>
            Garage Door Technician
          </span>
          <span className="spanf3" onClick={() => handleCategoryClick("Tiler")}>
            Tiler
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
