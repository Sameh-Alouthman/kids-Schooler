import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dos9zxky6/image/upload/v1753201434/%D0%B4%D0%B5%D1%82%D0%B8_prmccd.jpg",
    subtitle: "Welcome to KidsScholar",
    title: ["Learn", "With Joy"],
    buttonText: "Get Started",
    buttonLink: "/login",
  },
  {
    image:
      "https://res.cloudinary.com/dos9zxky6/image/upload/v1753264682/freepik__the-style-is-candid-image-photography-with-natural__26798_lwkkt7.png",
    subtitle: "Play and Grow Together",
    title: ["Play", "and Learn"],
    buttonText: "Get Started",
    buttonLink: "/login",
  },
  {
    image:
      "https://res.cloudinary.com/dos9zxky6/image/upload/v1753264689/portrait-girl-playing_tqkfgm.jpg",
    subtitle: "Explore and Discover",
    title: ["Explore", "and Learn"],
    buttonText: "Get Started",
    buttonLink: "/login",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen"
      style={{ maxHeight: "100vh" }}
    >
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative h-screen max-h-[100vh]">
            <img
              src={slide.image}
              alt={slide.subtitle}
              className="w-full h-full object-cover object-center"
              style={{ maxHeight: "100vh" }}
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center text-center px-6 md:px-16 pb-100">
              <p className="text-[#ffffff] px-3 py-1 rounded mb-3 text-2xl font-bold">
                {slide.subtitle}
              </p>
              <h2 className="text-white text-3xl sm:text-5xl font-bold mb-4">
                {slide.title[0]}{" "}
                <span className="text-pink-300">{slide.title[1]}</span>
              </h2>
              <a
                href={slide.buttonLink}
                className="bg-[#f0c96a] hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-2xl shadow transition"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
