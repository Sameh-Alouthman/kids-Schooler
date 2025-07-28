import React from "react";
import { FaCalculator, FaBook, FaFlask, FaLaptopCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LessonsPage = () => {
  const navigate = useNavigate();

  const subjects = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] py-25 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#bb4fa9] mb-12">
          Choose Your Subject 🚀
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {subjects.map(({ icon: Icon, title, desc, path }, i) => (
            <div
              key={i}
              onClick={() => navigate(path)}
              className="relative bg-white rounded-2xl p-6 text-center hover:scale-105 transition transform duration-300 overflow-hidden cursor-pointer shadow-lg"
            >
              <Icon className="text-5xl text-[#f0c96a] mx-auto mb-4 z-10 relative" />
              <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2 z-10 relative">
                {title}
              </h2>
              <p className="text-gray-700 z-10 relative">{desc}</p>
              <Icon className="absolute text-[#bb4fa9] text-[8rem] opacity-10 bottom-0 right-0 pointer-events-none" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default LessonsPage;
