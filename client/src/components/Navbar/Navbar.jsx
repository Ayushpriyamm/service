import React, { useEffect, useState } from 'react';
import './navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import logo from "../Navbar/service.png";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [open, setOpen] = useState(false); // State for mobile menu toggle
    const { pathname } = useLocation();
    
    // Set navbar active based on scroll position
    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    
    // Set navbar active1 based on scroll position
    const isActive1 = () => {
        window.scrollY > 50 ? setActive1(true) : setActive1(false);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', isActive);
        window.addEventListener('scroll', isActive1);
        return () => {
            window.removeEventListener('scroll', isActive);
            window.removeEventListener('scroll', isActive1);
        };
    }, []);

    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post('/auth/logout');
            localStorage.setItem("currentUser", null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const [input, setInput] = useState("");
    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    };

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to='/' className='link'>
                        <img src={logo} width="120px" alt="Service Logo" />
                    </Link>
                </div>
                
                {/* Search bar for when scrolled */}
                {active && (
                    <div className="navbarsearch">
                        <input
                            type="text"
                            placeholder='What service are you looking for today?'
                            onChange={e => setInput(e.target.value)}
                        />
                        <div className="search">
                            <img src="/images/search.png" alt="" onClick={handleSubmit} />
                        </div>
                    </div>
                )}

                <div className="links">
                    <span onClick={() => navigate('/becomeseller')}>Services</span>
                    <span className="tooltip">
                        Explore
                        <span className="tooltiptext">
                            {/* Tooltip content */}
                        </span>
                    </span>
                    <span>
                        <img
                            src='/images/language.png'
                            alt=''
                            width={'18px'}
                            height={'16px'}
                            style={{ marginRight: '10px' }}
                        />
                        English
                    </span>
                    <Link to='/login' className='link' key={333}><span>Sign in</span></Link>

                    {!current_user?.isSeller && <span onClick={e => navigate('/becomeSeller')}>Become a Service Provider</span>}
                    {!current_user && <button onClick={e => navigate(`/register`)}>Join</button>}
                    {
                        current_user && (
                            <div className="user" onClick={() => setOpen(!open)}>
                                <img src={current_user.img || '/images/noavtar.jpeg'} alt="" />
                                <span>{current_user?.username}</span>
                                {open && (
                                    <div className="options">
                                        {
                                            current_user.isSeller && (
                                                <>
                                                    <Link className='link' key={555} to='/mygigs'>Gigs</Link>
                                                    <Link className='link' key={999} to='/add'>Add New Gig</Link>
                                                </>
                                            )
                                        }
                                        <Link className='link' key={9996} to='/orders'>Orders</Link>
                                        <Link className='link' key={9995} to='/messages'>Messages</Link>
                                        <Link className='link' key={9993} onClick={handleLogout}>Logout</Link>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
                {/* Hamburger menu for smaller screens */}
                <div className="hamburger" onClick={() => setOpen(!open)}>
                    <img src="https://img.icons8.com/ios/50/equal-sign.png" alt="Hamburger Menu" />
                </div>
            </div>

            {open && (
                <div className="mobile-menu">
                    <Link to="/">Home</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {/* Add more links as needed */}
                </div>
            )}

            {(active1 || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link key={9983} className='link menulink' to='/'>
                            Painter
                        </Link>
                        <Link key={9883} className='link menulink' to='/'>
                            Carpenter
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Electrician
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Plumber
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Handyman
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            welder
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Window installer
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Furniture Maker
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Cleaning Services
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Garage Door Technician
                        </Link>
                        <Link key={9988} className='link menulink' to='/'>
                            Tiler
                        </Link>
                        {/* Other categories */}
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Navbar;
