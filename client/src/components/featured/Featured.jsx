import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './featured.scss';

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(input) {
      navigate(`gigs?search=${input}`);
    }
  }

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Connecting <span>Local Service Providers</span> <br />
            <span></span> with the Community
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="/images/search.png" alt="search" />
              <input
                type="text"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={(e) => navigate(`gigs?search=${e.target.innerHTML}`)}>Painter</button>
            <button onClick={(e) => navigate(`gigs?search=${e.target.innerHTML}`)}>Electrician</button>
            <button onClick={(e) => navigate(`gigs?search=${e.target.innerHTML}`)}>Plumber</button>
            <button onClick={(e) => navigate(`gigs?search=${e.target.innerHTML}`)}>Carpenter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
