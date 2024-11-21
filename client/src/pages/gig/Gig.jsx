import React from "react";
import "./Gig.scss";
import Slider from "react-slick";
import { useQuery,useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;
 console.log("userId",userId);
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });
  console.log("erroruser",errorUser)
console.log("datauser",dataUser);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const contactNumber = dataUser?.phone;

  const CreateOrder=useMutation({
    mutationKey:["createorder"],
    mutationFn:()=>{
       const body={
        gigId:id
       }
        return newRequest.post("/orders/addorder",body)
    },
 })
  return (
    <div className="gig">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <h4>Something Went Wrong</h4>
      ) : (
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "something gone wrong"
            ) : (
              <div className="user">
                <img
                  src={dataUser.img || "/images/noavtar.jpeg"}
                  alt=""
                  className="pp"
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/images/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {" "}
                      {Math.round(data.totalStars / data.starNumber)}{" "}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Slider {...sliderSettings} className="slider">
              {data.images.map((img) => (
                <div key={img}>
                  <img src={img} alt="" />
                </div>
              ))}
            </Slider>
            <h2>About This Job</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "something went wrong"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                {isLoading ? (
                  "loading"
                ) : error ? (
                  "Something Went Wrong"
                ) : (
                  <div className="user">
                    <img src={dataUser.img || "/images/noavtar.jpeg"} alt="" />
                    <div className="info">
                      <span>{dataUser.username}</span>
                      {!isNaN(data.totalStars / data.starNumber) && (
                        <div className="stars">
                          {Array(Math.round(data.totalStars / data.starNumber))
                            .fill()
                            .map((item, i) => (
                              <img src="/images/star.png" alt="" key={i} />
                            ))}
                          <span>
                            {" "}
                            {Math.round(data.totalStars / data.starNumber)}{" "}
                          </span>
                        </div>
                      )}
                      {/*  */}
                      {/* {contactNumber && (
                        <a
                          href={`tel:+91${contactNumber}`}
                          style={{ textDecoration: "none" }}
                          aria-label={`Call user at +91 ${contactNumber}`}
                        >
                          <button className="cont">Contact Me</button>
                        </a>
                      )} */}

                      {/*  */}
                      <a
                        href={`tel:+91${contactNumber}`}
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        <button className="cont"> Contact Me</button>
                      </a>
                    </div>
                  </div>
                )}
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} key={id}></Reviews>
          </div>
          <div className="right">
            <div className="price">
              <h2>Rs.{data.price}/-</h2>
            </div>

            <p>{data.sortDesc}</p>

            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/images/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

              <button onClick={()=>{CreateOrder.mutate()}}>Add To Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
