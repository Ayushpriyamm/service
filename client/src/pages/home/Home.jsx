import React from "react";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/Trusted By/TrustedBy"; // Ensure the path is correct
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
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part? Everything.</h1>
            <div className="title">
              <img src="/images/check.png" alt="check" />
              Stick to your budget
            </div>
            <p>
              Find the right service for every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="/images/check.png" alt="check" />
              Get quality work done quickly
            </div>
            <p>
              Hand your project over to a talented freelancer in minutes, get
              long-lasting results.
            </p>
            <div className="title">
              <img src="/images/check.png" alt="check" />
              Pay when you're happy
            </div>
            <p>
              Upfront quotes mean no surprises. Payments only get released when
              you approve.
            </p>
            <div className="title">
              <img src="/images/check.png" alt="check" />
              Count on 24/7 support
            </div>
            <p>
              Our round-the-clock support team is available to help anytime,
              anywhere.
            </p>
          </div>
          <div className="item">
            <video src="/images/video.mp4" controls width="100%"></video>
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>You need it, we've got it</h1>
          <div className="items">
            {[
              { cat: "Graphics & Design", img: "graphics-design.d32a2f8.svg" },
              { cat: "Digital Marketing", img: "online-marketing.74e221b.svg" },
              {
                cat: "Writing & Translation",
                img: "writing-translation.32ebe2e.svg",
              },
              { cat: "Video & Animation", img: "video-animation.f0d9d71.svg" },
              { cat: "Music & Audio", img: "music-audio.320af20.svg" },
              { cat: "Programming & Tech", img: "programming.9362366.svg" },
              { cat: "Business", img: "business.bbdf319.svg" },
              { cat: "Lifestyle", img: "lifestyle.745b575.svg" },
              { cat: "Data", img: "data.718910f.svg" },
              { cat: "Photography", img: "photography.01cf943.svg" },
            ].map(({ cat, img }) => (
              <div
                className="item"
                onClick={() => navigate(`gigs?cat=${cat}`)}
                key={cat}
              >
                <img
                  src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${img}`}
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
              fiverr{" "}
              <em>
                <span style={{ fontWeight: "300" }}>business.</span>
              </em>
            </h1>
            <h1>
              A solution built for <em>business</em>
            </h1>
            <p>
              Upgrade to a curated experience to access vetted talent and
              exclusive tools.
            </p>
            {[
              "Talent matching",
              "Dedicated account management",
              "Team collaboration tools",
              "Business payment solutions",
            ].map((title) => (
              <div className="title" key={title}>
                <img src="/images/check.png" alt="check" />
                {title}
              </div>
            ))}
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              src="images/business-desktop-870-x1.webp"
              alt="business solution"
            />
          </div>
        </div>
      </div>
      <div className="logo_maker">
        <div className="items">
          <div className="left">
            <h1>
              fiverr <span>logomaker.</span>
            </h1>
            <p className="first_para">
              Make an incredible logo
              <br />
              <em className="first_para_em"> in minutes</em>
            </p>
            <p className="second_para">
              Pre-designed by top talent. Just add your touch.
            </p>
            <button className="logo_button">
              <strong>Try Fiverr Logo Maker</strong>
            </button>
          </div>
          <div className="right">
            <img src="/images/logomaker.webp" alt="Logo Maker" />
          </div>
        </div>
      </div>
      {/* second slidebar */}
      <div className="secondslide">
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
      </div>
    </div>
  );
};

export default Home;
