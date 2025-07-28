import React from "react";
import { BookOpen, BrainCircuit, Calculator } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { FaBook, FaCalculator, FaFlask } from "react-icons/fa";



export default function GamePage() {
  const navigate = useNavigate()
  const FloatingIcon = ({ Icon, style }) => (
    <Icon
      className="text-[#bb4fa9] opacity-10 text-[4rem] lg:text-[6rem] absolute animate-float"
      style={style}
    />
  );
 return (
   <div className="flex flex-col min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] pt-20">
     {/* Background Floating Icons */}
     <div className="absolute inset-0 z-0 pointer-events-none">
       <FloatingIcon Icon={FaCalculator} style={{ top: "25%", left: "8%" }} />
       <FloatingIcon Icon={FaBook} style={{ top: "60%", right: "10%" }} />
       <FloatingIcon Icon={FaFlask} style={{ top: "40%", left: "50%" }} />
     </div>
     <main className="relative z-10 px-6 sm:px-10 lg:px-20 py-20 text-center max-w-6xl mx-auto flex-grow">
       <h1 className="text-4xl sm:text-5xl font-extrabold text-[#bb4fa9] mb-8 leading-tight">
         🎮 Choose Your <span className="text-[#f0c96a]">Game</span>
       </h1>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
         {/* Math Game */}
         <div
           onClick={() => navigate("/math-quiz")}
           className="relative bg-white rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.1)] p-6 cursor-pointer transition-transform hover:-translate-y-2 border-t-[6px] border-[#f0c96a]"
         >
           <Calculator className="text-5xl text-[#f0c96a] mb-4 mx-auto" />
           <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2">Math</h2>
           <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
             Practice addition, subtraction and multiplication!
           </p>
           <Calculator className="absolute text-[#f0c96a] text-[8rem] opacity-5 bottom-2 right-2" />
         </div>

         {/* Science Game */}
         <div
           onClick={() => navigate("/science")}
           className="relative bg-white rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.1)] p-6 cursor-pointer transition-transform hover:-translate-y-2 border-t-[6px] border-[#f0c96a]"
         >
           <BrainCircuit className="text-5xl text-[#f0c96a] mb-4 mx-auto" />
           <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2">Science</h2>
           <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
             Discover space, animals and fun nature facts!
           </p>
           <BrainCircuit className="absolute text-[#bb4fa9] text-[8rem] opacity-5 bottom-2 right-2" />
         </div>
       </div>
     </main>

     {/* <Footer /> */}
   </div>
 );

}
