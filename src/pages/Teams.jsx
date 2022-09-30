import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTeam from "../components/dialogs/AddTeam";
import TeamList from "../components/teams/TeamList";
import { clearSearchedData } from "../features/projects/projectSlice";
import { useGetTeamsQuery } from "../features/teams/teamsAPI";

const Teams = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();
  const {
    user: { email },
  } = auth || {};
  const {
    data: teams,
    isError,
    isLoading,
    isSuccess,
  } = useGetTeamsQuery(email);
  useEffect(() => {
    dispatch(clearSearchedData());
  }, []);
  let content;
  if (isLoading && !isSuccess && !isError) {
    content = "Contents loading...";
  } else if (isSuccess && !isLoading && !isError && teams.length > 0) {
    content = <TeamList teams={teams} />;
  } else if (isError && !isLoading) {
    content = "Something went wrong";
  } else if (!isError && !isLoading && teams.length == 0) {
    content = "No teams found";
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      {" "}
      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        {/* add team */}
        <button
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          onClick={openModal}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
        <AddTeam isOpen={isOpen} closeModal={closeModal} />
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default Teams;
