import React, { useEffect, useState } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutForm from "../../components/checkOutForm/CheckOutForm";

// Stripe public key should be loaded outside of the component to prevent reloading on each render
const stripePromise = loadStripe(
  "pk_test_51QKv3GKrz2bWBo4qgifbLaxEMRSY3OoTB04FiQcen4zPGTXkyzahX9Y3oWd4eqBIc8Va5nYOpAemDryKOLSxM55V00RukeDMY5"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Token from localStorage
  const token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).accessToken
    : null;

  // Redirect to login if no token found
  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in again.");
      navigate("/login"); // Redirect to login page if no token
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return; // If no token, skip the API call

    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`,
          null, // No body needed for this request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the JWT token as Authorization header
            },
          }
        );
        setClientSecret(res.data.clientSecret); // Store the clientSecret to use in Stripe Elements
      } catch (err) {
        console.error(
          "Error occurred while creating payment intent:",
          err.response || err.message
        );
        alert("There was an issue processing your payment. Please try again.");
      }
    };

    makeRequest();
  }, [id, token]); // Re-run if `id` or `token` changes

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return <div>Loading payment information...</div>; // Display a loading message until clientSecret is received.
  }

  return (
    <div className="pay">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Pay;
