import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import logo from "../Navbar/service.png";
import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false); // Toggle for user options
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Toggle for mobile menu
  const [input, setInput] = useState(""); // State for search input
  const { pathname } = useLocation();
  const optionsRef = useRef(null); // Reference for user options dropdown
  const navigate = useNavigate();

  // Handle scroll effect for active navbar state
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current_user = JSON.parse(localStorage.getItem("currentUser"));

  // Handle logout
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Handle search submit
  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`navbar ${active || pathname !== "/" ? "active" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <img src={logo} width="120px" alt="Service Logo" />
          </Link>
        </div>

        {/* Search bar for when scrolled */}
        {active && (
          <div className="navbarsearch">
            <input
              type="text"
              placeholder="What service are you looking for today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="search">
              <img src="/images/search.png" alt="" onClick={handleSubmit} />
            </div>
          </div>
        )}

        <div className="links">
          <span onClick={() => navigate("/becomeseller")}>Services</span>
          <span className="tooltip">
            Explore
            <span className="tooltiptext">{/* Tooltip content */}</span>
          </span>
          <span>
            <img
              src="/images/language.png"
              alt=""
              width={"18px"}
              height={"16px"}
              style={{ marginRight: "10px" }}
            />
            English
          </span>
          <Link to="/login" className="link">
            <span>Sign in</span>
          </Link>

          {/* Show this only if the user is not a seller */}
          {!current_user?.isSeller && (
            <span onClick={() => navigate("/becomeSeller")}>
              Become a Service Provider
            </span>
          )}
          {!current_user && (
            <button onClick={() => navigate(`/register`)}>Join</button>
          )}
          {current_user && (
            <div
              className="user"
              onClick={() => setOpen(!open)} // Toggle the dropdown menu
              ref={optionsRef}
            >
              <img src={current_user.img || "/images/noavtar.jpeg"} alt="" />
              <span>{current_user?.username}</span>
              {open && (
                <div className="options">
                  {current_user.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link onClick={handleLogout} className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <img
            src="https://img.icons8.com/ios/50/equal-sign.png"
            alt="Hamburger Menu"
          />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu show">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}

      {/* Navigation links */}
      <div className="menu">
        <Link to="/services" className="menulink">
          Home Services
        </Link>
        <Link to="/consultancy" className="menulink">
          Consultancy
        </Link>
        <Link to="/event" className="menulink">
          Event Services
        </Link>
        <Link to="/jobs" className="menulink">
          Jobs & Hiring
        </Link>
        <Link to="/handicraft" className="menulink">
          Handicraft
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
