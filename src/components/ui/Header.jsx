import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/logo.svg";
const Header = () => {
  const location = useLocation();
  const [isTeam, setIsTeam] = useState(
    Boolean(location?.pathname?.split("/")[2] === "teams")
  );
  useEffect(() => {
    setIsTeam(Boolean(location?.pathname?.split("/")[2] === "teams"));
  }, [location.pathname]);
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={Logo} className="h-10 w-10" />
      {!isTeam && (
        <input
          className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search for anything…"
        />
      )}
      <div className="flex-1"></div>
      <div className="mr-10">
        <Link
          to="/home/projects"
          className={`mx-2 text-sm font-semibold ${
            !isTeam ? "text-indigo-700" : ""
          }`}
          //   href="projects.html"
        >
          Projects
        </Link>
        <Link
          to="/home/teams"
          className={`mx-2 text-sm font-semibold ${
            isTeam ? "text-indigo-700" : ""
          }`}
        >
          Team
        </Link>
      </div>
      <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
        <img
          src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
          alt=""
        />
      </button>
    </div>
  );
};

export default Header;
