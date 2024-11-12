import React from "react";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/Slide/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Featured />
      <div className="slidhome">
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      </div>

      <div className="explore">
        <div className="container">
          <h1>You need it, we've got it</h1>
          <div className="items">
            {[
              { cat: "Painter", img: "https://img.icons8.com/color/48/painting-a-wall.png" },
              { cat: "Carpenter ", img: "https://img.icons8.com/color/48/sawing-man.png" },
              {
                cat: "Electrician",
                img: "https://img.icons8.com/external-itim2101-flat-itim2101/64/external-electrician-male-occupation-avatar-itim2101-flat-itim2101.png",
              },
              { cat: "Plumber", img: "https://img.icons8.com/color/48/plumber.png" },
              { cat: "Handyman", img: "https://img.icons8.com/external-flat-juicy-fish/60/external-handyman-side-hustles-flat-flat-juicy-fish.png" },
              { cat: "Welder ", img: "https://img.icons8.com/external-wanicon-flat-wanicon/64/external-welder-labour-day-wanicon-flat-wanicon.png" },
              { cat: "Window Installer", img: "https://img.icons8.com/emoji/48/window-emoji.png" },
              { cat: "Furniture Maker", img: "https://img.icons8.com/arcade/64/furniture.png" },
              { cat: "Cleaning Services", img: "https://img.icons8.com/arcade/64/cleaning-service.png" },
              { cat: "Garage Door Technician", img: "https://img.icons8.com/color/48/door.png" },
              { cat: "Tiler", img: "https://img.icons8.com/external-others-pike-picture/50/external-equipment-tiler-work-equipment-others-pike-picture-2.png" }
            ].map(({ cat, img }) => (
              <div
                className="item"
                onClick={() => navigate(`gigs?cat=${cat}`)}
                key={cat}
              >
                <img
                  src={img}
                  alt={cat}
                />
                <div className="line"></div>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
            ServiceBridge{" "}
              <em>
                <span style={{ fontWeight: "300" }}>business Solutions.</span>
              </em>
            </h1>
            <h1>
            A platform designed to connect Consumer with skilled service providers for all your needs.
            </h1>
            <p>
            Unlock a tailored experience to access trusted professionals and exclusive tools.
            </p>
            {[
              "Service Provider Matching ",
              "Tailored Support ",
              "collaboration tools",
              "Secure Payment Solutions",
            ].map((title) => (
              <div className="title" key={title}>
                <img src="/images/check.png" alt="check" />
                {title}
              </div>
            ))}
            <button>Explore ServiceBridge</button>
          </div>
          <div className="item" style={{ width: '300px' }}>
            <img
              src="https://images.stockcake.com/public/3/3/7/3378395b-b8d8-41c8-9f15-a8b7a749f7e8_large/laborer-carrying-bricks-stockcake.jpg" className="imglab"
              style={{ width: '300px', height: 'auto', }}
              alt="business solution"
            />
          </div>
        </div>
      </div>
    
           
      {/* second slidebar */}
      {/* <div className="secondslide">
        <p className="second_slider_heading">Inspiring work made on Fiverr</p>
        <Slide slidesToShow={4} arrowsScroll={5}>
          {projects.map((card) => (
            <ProjectCard item={card} key={card.id} />
          ))}
        </Slide>
      </div>
      <div className="last_hero">
        <div className="items">
          <div className="left">
            <h1>
              Suddenly it's all so{" "}
              <em>
                <span className="last_hero_em">doable.</span>
              </em>
            </h1>
            <button onClick={() => navigate(`/register`)}>Join Fiverr</button>
          </div>
          <div className="right">
            <img src="/images/last_hero.webp" alt="Last Hero" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
