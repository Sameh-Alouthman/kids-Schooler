import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#bb4fa9] text-white pt-12 pb-8 px-6 shadow-inner">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#f0c96a] inline-block pb-1">
            About KidsScholar
          </h3>
          <p className="text-sm text-purple-200 leading-relaxed max-w-sm mx-auto md:mx-0">
            KidsScholar is a fun and interactive platform that helps children
            learn through games, lessons, and quizzes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#f0c96a] inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-purple-200 max-w-xs mx-auto md:mx-0">
            {[
              { to: "/", label: "Home" },
              { to: "/games", label: "Games" },
              { to: "/lessons", label: "Lessons" },
              { to: "/quizzes", label: "Quizzes" },
              { to: "/stories", label: "Stories" },
              {
                /* هذا الرابط الجديد */
              },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-[#f0c96a] transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#f0c96a] inline-block pb-1">
            Connect with Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-6 mb-4 text-lg text-purple-200">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-[#f0c96a] transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-[#f0c96a] transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-[#f0c96a] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:contact@kidsscholar.com"
              aria-label="Email"
              className="hover:text-[#f0c96a] transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-sm text-purple-200 max-w-xs mx-auto md:mx-0">
            Email:{" "}
            <a
              href="mailto:contact@kidsscholar.com"
              className="underline hover:text-[#f0c96a] transition-colors duration-300"
            >
              contact@kidsscholar.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 border-t border-[#f0c96a]/40 pt-6 text-center text-sm text-purple-200">
        © {new Date().getFullYear()} KidsScholar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
