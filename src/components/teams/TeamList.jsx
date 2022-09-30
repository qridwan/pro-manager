import { Menu } from "@headlessui/react";
import gravatarUrl from "gravatar-url";
import moment from "moment";
import React, { useState } from "react";
import classNames from "../../utils/classNames";
import AddTeamMember from "../dialogs/AddTeamMember";
import TeamCardMenu from "./TeamCardMenu";

const TeamList = ({ teams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [team, setTeam] = useState({});
  const closeOpen = () => {
    setIsOpen(false);
  };
  const openModel = () => {
    setIsOpen(true);
  };
  return (
    <div>
      {teams
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((team) => {
          const date = moment(team.timestamp).format("MMM Do YY");
          // console.log(`bg-[${team.color}]`);
          const color = team.color;
          return (
            <div
              key={team.uid}
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <div className="absolute top-0 right-0">
                <Menu as="div" className="relative inline-block text-left ">
                  <Menu.Button
                    onClick={() => setTeam(team)}
                    className=" flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                  >
                    {/* <button > */}
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    {/* </button> */}
                  </Menu.Button>
                  <TeamCardMenu openModel={openModel} />
                </Menu>
              </div>

              <span
                className={classNames(
                  "flex items-center h-6 px-3 text-xs font-semibold rounded-full"
                )}
                style={{
                  backgroundColor: color + 20,
                  color: color,
                }}
              >
                {team.name}
              </span>
              <h4 className="mt-3 text-sm font-medium">{team.description}</h4>
              <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-300 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">{date}</span>
                </div>
                <div className="flex -space-x-1 overflow-hidden items-center">
                  {team.members
                    ?.slice(0, 3)
                    .sort()
                    .map((email) => (
                      <img
                        key={email}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={gravatarUrl(email, {})}
                        alt="mail"
                        title={email}
                      />
                    ))}
                  {team.members.length > 3 && (
                    <span className="inline-block h-4 w-12 rounded-full ring-2 ring-white bg-white font-bold text-md">
                      +{team.members.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <AddTeamMember isOpen={isOpen} closeOpen={closeOpen} team={team} />
    </div>
  );
};

export default TeamList;
