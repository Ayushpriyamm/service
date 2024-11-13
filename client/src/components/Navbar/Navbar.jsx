import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import logo from "../Navbar/service.png";
import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Toggle for mobile menu
  const [input, setInput] = useState(""); // State for search input
  const { pathname } = useLocation();
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
            <div className="search" onClick={handleSubmit}>
              <img src="/images/search.png" alt="" />
            </div>
          </div>
        )}

        <div className="links">
          <span onClick={() => navigate("/gigs")}>Services</span>
          {!current_user && (
            <>
              <Link to="/login" className="link">
                <span>Sign in</span>
              </Link>
              <button onClick={() => navigate(`/register`)}>Join</button>
            </>
          )}
          {current_user && (
            <>
              {current_user.isSeller ? (
                <>
                  <Link to="/mygigs" className="link">
                    Gigs
                  </Link>
                  <Link to="/add" className="link">
                    Add New Gig
                  </Link>
                </>
              ) : (
                <span onClick={() => navigate("/becomeSeller")}>
                  Become a Service Provider
                </span>
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
              <div className="user-info">
                <img
                  src={current_user.img || "/images/noavtar.jpeg"}
                  alt="User Avatar"
                  className="user-icon"
                />
              </div>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
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
