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
    <div className={`navbar2 ${active || pathname !== "/" ? "active" : ""}`}>
      <div className="container2">
        <div className="logo2">
          <Link to="/" className="link2">
            <img src={logo} width="120px" alt="Service Logo" />
          </Link>
        </div>

        {/* Search bar for when scrolled */}
        {active && (
          <div className="navbarsearch2">
            <input
              type="text"
              placeholder="What service are you looking for today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="search2" onClick={handleSubmit}>
              <img src="/images/search.png" alt="" />
            </div>
          </div>
        )}

        <div className="links2">
          <span onClick={() => navigate("/gigs")}>Services</span>
          {!current_user && (
            <>
              <Link to="/login" className="link2">
                <span>Sign in</span>
              </Link>
              <button onClick={() => navigate(`/register`)}>Register</button>
            </>
          )}
          {current_user && (
            <>
              {current_user.isSeller ? (
                <>
                  <Link to="/mygigs" className="link2">
                    Jobs
                  </Link>
                  <Link to="/add" className="link2">
                    Add New Job
                  </Link>
                </>
              ) : (
                <span onClick={() => navigate("/register")}>
                  Become a Service Provider
                </span>
              )}
              <Link to="/orders" className="link2">
                Orders
              </Link>
              <Link onClick={handleLogout} className="link2">
                Logout
              </Link>
              <div className="user-info2">
                <img
                  src={current_user.img || "/images/noavtar.jpeg"}
                  alt="User Avatar"
                  className="user-icon2"
                />
              </div>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div
          className="hamburger2"
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
        <div className="mobile-menu2 show2">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}

      {/* Navigation links */}
      <div className="menu2">
      <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
      Carpenter
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Electrician
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Painter
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        PLumber
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Hnadyman
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Window Installer
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Cleaning Services
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Furniture Maker
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Welder
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
        Garage Door Technician
        </button>
        <button className="menulink2" onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>
          Tiler
        </button>
      </div>
    </div>
  );
};

export default Navbar;
