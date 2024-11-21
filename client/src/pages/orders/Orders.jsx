import React, { useEffect, useState } from "react";
import './orders.scss';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [order, setOrder] = useState(null);
  const [usernames, setUsernames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await newRequest.get('/orders/getorder');
        setOrder(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

  // Fetch usernames based on serviceProviderId
  useEffect(() => {
    const fetchUsernames = async () => {
      if (order && order.gigs.length > 0) {
        try {
          const userPromises = order.gigs.map(async (gig) => {
            if (gig.serviceProviderId) {
              const userResponse = await newRequest.get(`/users/${gig.serviceProviderId}`);
              return { [gig.serviceProviderId]: userResponse.data.username };
            }
            return null;
          });

          const userResponses = await Promise.all(userPromises);
          const usernameMap = userResponses.reduce((acc, current) => {
            if (current) {
              return { ...acc, ...current };
            }
            return acc;
          }, {});
          setUsernames(usernameMap);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchUsernames();
  }, [order]);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <h4>Something went wrong: {error}</h4>;
  }

  return (
    <div className="orders">
      {order && order.gigs.length > 0 ? (
        <div className="order-details">
          <h1>Order Summary</h1>
          <div className="gigs-list">
            {order.gigs.map((gig, index) => (
              <div className="gig-item" key={index}>
                {/* Access and display specific properties of the gig object */}
                <h2>Job {index + 1}</h2>
                <p>Title: {gig.title}</p>  {/* Show the title of the gig */}
                <p>Description: {gig.desc}</p> {/* Show the description of the gig */}
                <p>Price: Rs.{gig.price}</p> {/* Show the price of the gig */}
                <p>Delivery Time: {gig.deliveryTime}</p> {/* Show the delivery time */}
                {/* Fetch and display username based on serviceProviderId */}
                <p>Service Provider: {usernames[gig.serviceProviderId] || "Unknown"}</p>
              </div>
            ))}
          </div>
          <div className="total-amount">
            <h3>Total Amount: Rs.{order.totalAmount}/-</h3>
          </div>
        </div>
      ) : (
        <p>No Jobs in your order yet.</p>
      )}
    </div>
  );
};

export default Orders;
