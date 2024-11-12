import React, { useState } from "react";
import './featured.scss';
import{ useNavigate} from 'react-router-dom';

function Featured() {
  const [input,setinput]=useState("");
  const navigate=useNavigate();
  const handlesubmit=()=>{
    navigate(`gigs?search=${input}`);
  }
    return (
     [ 
      <div className="featured">
        <div className="container">
          <div className="left">
            <h1>
            Connecting  <span>Local Service Providers</span> <br></br>
              <span></span>  with the Community
            </h1>
            <div className="search">
              <div className="searchInput">
                <img src="/images/search.png" alt="" />
                <input type="text" placeholder='' onChange={e=>setinput(e.target.value)} />
              </div>
              <button onClick={handlesubmit}>Search</button>
            </div>
            <div className="popular">
              <span>Popular:</span>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Painter</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Electrician</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Plumber</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Carpenter</button>
            </div>
          </div>
        </div>
      </div>]
    );
  }
export default Featured;