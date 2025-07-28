import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../../theme";
import axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { FaBookOpen, FaEquals, FaMinus, FaPlus, FaRocket, FaSmile, FaStar } from "react-icons/fa";

export default function Books() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("http://localhost:5300/api/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const FloatingIcon = ({ Icon, className }) => (
    <Icon
      className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute animate-pulse pointer-events-none"
      style={className}
    />
  );

  return (
    <div className="font-sans relative overflow-hidden bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] min-h-screen">
      <Navbar />

      {/* Floating Background Icon */}
      <FaBookOpen className="text-gray-400 opacity-10 text-[10rem] absolute top-[30%] left-[10%] pointer-events-none z-0" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaPlus} className={{ top: "20%", left: "5%" }} />
        <FloatingIcon Icon={FaMinus} className={{ top: "30%", left: "80%" }} />
        <FloatingIcon Icon={FaStar} className={{ top: "42%", right: "35%" }} />
        <FloatingIcon
          Icon={FaSmile}
          className={{ bottom: "40%", right: "5%" }}
        />
        <FloatingIcon Icon={FaRocket} className={{ top: "40%", left: "45%" }} />
        <FloatingIcon
          Icon={FaEquals}
          className={{ bottom: "30%", left: "20%" }}
        />
      </div>

      {/* Header Section */}
      <section className="relative z-10 bg-white pt-32 pb-16 px-6 sm:px-10 lg:px-20 text-center max-w-5xl mx-auto rounded-b-3xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight text-[#bb4fa9] mb-6">
          📘 Explore Our <span className="text-[#f0c96a]">Story Library</span>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Discover fun and educational stories crafted for young minds!
        </p>
      </section>

      {/* Story Cards */}
      <section className="relative z-10 py-24 px-6 lg:px-32 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-16 max-w-full rounded-t-3xl">
        {stories.map((story) => (
          <div
            key={story._id}
            className="group relative w-52 h-80 sm:w-56 sm:h-88 mx-auto cursor-pointer transform transition-transform duration-300 hover:-translate-y-3"
            onClick={() => navigate(`/story/${story._id}`)}
          >
            {/* Book Style Card */}
            <div className="absolute left-0 top-0 w-[10px] h-full bg-[#4b3869] rounded-l-lg shadow-inner z-10"></div>
            <div className="relative z-20 w-full h-full rounded-r-lg overflow-hidden border border-[#f0c96a] bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.2)] group-hover:shadow-[0px_10px_35px_rgba(187,79,169,0.3)] transition duration-300">
              <div className="absolute inset-y-0 right-0 w-[6px] bg-gradient-to-r from-white via-gray-200 to-white opacity-80"></div>
              <img
                src={story.cover || "/images/placeholder.png"}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 px-4 py-2 rounded shadow-md">
                <h4 className="text-[#bb4fa9] text-base sm:text-lg font-bold text-center truncate w-44">
                  {story.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
