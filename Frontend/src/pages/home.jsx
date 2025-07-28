import React from "react";
import {
  FaCalculator,
  FaBook,
  FaFlask,
  FaAtom,
  FaPlus,
  FaEquals,
  FaFont,
  FaLaptopCode,
  FaStar,
  FaSmile,
  FaRocket,
  FaPlay,
  FaQuoteLeft,
  FaLaptop,
  FaTabletAlt,
  FaMobileAlt,
} from "react-icons/fa";
import HeroSlider from "../components/HeroSlider";
import Footer from "../components/footer";
import GLBViewer from "../../../../../anas/Kids-Scholar-main/Kids-Scholar-main/Frontend/src/components/GLBViewer";
import { useNavigate } from "react-router-dom";

// Floating icon component
const FloatingIcon = ({ Icon, className }) => (
  <Icon
    className={`text-gray-500 opacity-20 text-[4rem] lg:text-[6rem] absolute animate-float ${className}`}
  />
);

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans relative overflow-hidden">
      <HeroSlider />

      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaCalculator} className="top-[55%] left-[5%]" />
        <FloatingIcon Icon={FaPlus} className="top-[30%] left-[40%]" />
        <FloatingIcon Icon={FaEquals} className="top-[65%] right-[10%]" />
        <FloatingIcon Icon={FaFont} className="top-[60%] right-[5%]" />
        {/* <FloatingIcon Icon={FaBook} className="top-[60%] right-[15%]" /> */}
        <FloatingIcon Icon={FaFlask} className="bottom-[15%] left-[25%]" />
        <FloatingIcon Icon={FaAtom} className="bottom-[20%] right-[20%]" />
        <FloatingIcon Icon={FaStar} className="top-[42%] right-[35%]" />
        <FloatingIcon Icon={FaSmile} className="bottom-[8%] right-[5%]" />
        <FloatingIcon Icon={FaRocket} className="top-[40%] left-[15%]" />
        <FloatingIcon Icon={FaPlay} className="bottom-[28%] left-[5%]" />
      </div>

      {/* Welcome Section */}
      <section className="relative z-10 bg-white py-20 px-6 sm:px-10 lg:px-20 text-center max-w-5xl mx-auto rounded-b-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[#bb4fa9] mb-6">
          Welcome to <span className="text-[#f0c96a]">KidsScholar</span>!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Fun learning for Math, English, Science & Programming. Explore
          exciting games, lessons, and quizzes made just for kids!
        </p>
        <div className=" w-[800px] h-[50vh]">
          <GLBViewer url="/model.glb" scale={1} />
        </div>
      </section>

      {/* Subject Cards */}
      <section className="relative z-10 bg-[#dbeffe] py-16 px-6 lg:px-32 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-full rounded-t-3xl shadow-lg">
        {[
          {
            icon: FaCalculator,
            title: "Math Magic",
            desc: "Practice numbers, shapes, puzzles, and logic in a fun way!",
            path: "/math",
          },
          {
            icon: FaBook,
            title: "English Fun",
            desc: "Learn new words, stories, grammar, and reading skills.",
            path: "/english",
          },
          {
            icon: FaFlask,
            title: "Cool Science",
            desc: "Explore animals, plants, planets, and cool experiments!",
            path: "/science",
          },
          {
            icon: FaLaptopCode,
            title: "Programming Fun",
            desc: "Learn coding basics, logic games, and create cool animations!",
            path: "/programming",
          },
        ].map(({ icon: Icon, title, desc, path }, i) => {
          const navigate = useNavigate();
          return (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 text-center hover:scale-105 transition transform duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(path)}
            >
              <Icon className="text-5xl text-[#f0c96a] mx-auto mb-4 z-10 relative" />
              <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2 z-10 relative">
                {title}
              </h2>
              <p className="text-gray-700 z-10 relative">{desc}</p>
              <Icon className="absolute text-[#bb4fa9] text-[8rem] opacity-10 bottom-0 right-0" />
            </div>
          );
        })}
      </section>

      {/* Why KidsScholar */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-32 text-center rounded-b-3xl">
        <h2 className="text-4xl font-bold text-[#bb4fa9] mb-12">
          Why KidsScholar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#fff3f9] rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <FaSmile className="text-5xl text-[#bb4fa9] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#bb4fa9] mb-2">
              Fun & Interactive
            </h3>
            <p className="text-gray-700">
              Learning is a joyful adventure with exciting games and challenges.
            </p>
          </div>
          <div className="bg-[#fff3f9] rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <FaStar className="text-5xl text-[#bb4fa9] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#bb4fa9] mb-2">
              Skill-Based Learning
            </h3>
            <p className="text-gray-700">
              Build real skills with structured lessons in every subject.
            </p>
          </div>
          <div className="bg-[#fff3f9] rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <FaRocket className="text-5xl text-[#bb4fa9] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#bb4fa9] mb-2">
              Made for Kids
            </h3>
            <p className="text-gray-700">
              Safe, colorful, and designed especially for curious young minds.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#dbeffe] py-20 px-6 sm:px-10 lg:px-32 text-center rounded-b-3xl">
        <h2 className="text-4xl font-bold text-[#bb4fa9] mb-12">
          What Parents Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              text: "My son loves KidsScholar! He actually asks to do his lessons.",
              name: "Sarah M.",
            },
            {
              text: "Perfect blend of fun and education. I highly recommend it!",
              name: "Daniel T.",
            },
            {
              text: "My daughter learned more in 2 weeks than in a whole semester!",
              name: "Lara K.",
            },
          ].map(({ text, name }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <FaQuoteLeft className="text-3xl text-[#bb4fa9] mb-4" />
              <p className="text-gray-700 italic">“{text}”</p>
              <p className="text-sm font-semibold text-[#bb4fa9] mt-4">
                — {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-20 text-center px-6 rounded-b-3xl">
        <FaRocket className="text-6xl mx-auto text-[#f0c96a] mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-[#bb4fa9] mb-4">
          Ready to start the journey?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Sign up now and let your child explore a world of fun learning!
        </p>
        <button className="bg-[#f0c96a] text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 transition">
          Join Now
        </button>
      </section>

      {/* Supported Devices */}
      <section className="bg-[#fff3f9] py-20 px-6 sm:px-10 lg:px-32 text-center rounded-b-3xl">
        <h2 className="text-4xl font-bold text-[#bb4fa9] mb-12">
          Available on All Devices
        </h2>
        <div className="flex flex-wrap justify-center gap-12 text-[#f0c96a]">
          <div className="flex flex-col items-center">
            <FaLaptop className="text-5xl mb-2" />
            <span className="text-lg font-semibold">Laptop</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTabletAlt className="text-5xl mb-2" />
            <span className="text-lg font-semibold">Tablet</span>
          </div>
          <div className="flex flex-col items-center">
            <FaMobileAlt className="text-5xl mb-2" />
            <span className="text-lg font-semibold">Smartphone</span>
          </div>
        </div>
      </section>

      {/* Robot */}
      <div className="absolute top-230 right-10 p-4 z-10 pointer-events-none">
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223861/robot_lfu0gs.png"
          alt="robot image"
          className="w-40 lg:w-70 object-contain"
        />
      </div>
    </div>
  );
};

export default Homepage;

// #f0c96a
// #dbeffe
// #bb4fa9
// #fff3f9
