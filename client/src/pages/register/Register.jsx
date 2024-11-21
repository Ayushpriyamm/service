import React, { useState } from "react";
import "./resgister.scss";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return [
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handlechange}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            onChange={handlechange}
          />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" 
          placeholder="********"
          onChange={handlechange} />

          <label htmlFor="img">Profile Picture</label>
          <input
            type="file"
            name="img"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            placeholder="INDIA"
            onChange={handlechange}
          />
           <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 234 567 89"
            onChange={handlechange}
            pattern="[\+]?[0-9]{1,4}[-\s]?[0-9]{1,15}" 
            required
          />
          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="desc">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={handlechange}
          ></textarea>
        </div>
      </form>
    </div>
  ];
};
export default Register;
