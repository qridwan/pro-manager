import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/logo.svg";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useSearchProjectsQuery } from "../../features/projects/projectsApi";
import { clearSearchedData } from "../../features/projects/projectSlice";
import { debounceHandler } from "../../utils/debounceHandler";
const Header = () => {
  const auth = useSelector((state) => state.auth) || {};
  const {
    user: { email },
  } = auth || {};
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const [isTeam, setIsTeam] = useState(
    Boolean(location?.pathname?.split("/")[2] === "teams")
  );

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  useEffect(() => {
    setIsTeam(Boolean(location?.pathname?.split("/")[2] === "teams"));
  }, [location.pathname]);

  const {
    data: querySearchedData,
    isLoading,
    isError,
    refetch,
  } = useSearchProjectsQuery(
    { title, email },
    {
      skip: !isSearch,
    }
  );

  const reset = () => {
    setTitle("");
  };

  const doSearch = (value) => {
    console.log("value: ", value);
    dispatch(clearSearchedData());
    if (value) {
      setIsSearch(true);
      refetch();
      setTitle(value);
    } else {
      dispatch(clearSearchedData());
    }
  };

  const handleQueryTeam = debounceHandler(doSearch, 500);

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={Logo} className="h-10 w-10" />
      {!isTeam && (
        <input
          onChange={(e) => handleQueryTeam(e.target.value)}
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
      <button
        className="flex items-center justify-center ml-10 px-2 overflow-hidden cursor-pointer border border-red-300"
        onClick={logout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Header;
