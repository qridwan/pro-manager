import { Menu } from "@headlessui/react";
import gravatarUrl from "gravatar-url";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/logo/logo.svg";
import AddProject from "../components/dialogs/AddProject";
import TeamCardMenu, {
  DeleteActiveIcon,
  DeleteInactiveIcon,
} from "../components/teams/TeamCardMenu";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../features/projects/projectsApi";
const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth) || {};
  const [deleteProject] = useDeleteProjectMutation();
  const {
    user: { email },
  } = auth || {};
  const { data: myProjects } = useGetProjectsQuery(email);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleDelete = (id, author) => {
    console.log("id, author: ", id, author);
    if (author === email) {
      deleteProject({ id: id, sender: email });
    } else null;
  };
  return (
    <div>
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Backlog</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              {myProjects?.length ?? ""}
            </span>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            <AddProject closeModal={closeModal} isOpen={isOpen} />
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            {myProjects
              ?.slice()
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((project) => {
                const date = moment(project.timestamp).format("MMM Do YY");
                const bgColor = project.color;
                return (
                  <div
                    key={project.id}
                    className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                    draggable="true"
                  >
                    <div className="absolute right-2 top-1">
                      <Menu
                        as="div"
                        className="relative inline-block text-left "
                      >
                        <Menu.Button className="flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                            <svg
                              className="w-4 h-4 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-40  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  handleDelete(project.id, project.author)
                                }
                                className={`${
                                  active
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-900 hover:bg-blue-500 hover:text-white"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <DeleteActiveIcon
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <DeleteInactiveIcon
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                    {/* </button> */}
                    <span
                      className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full`}
                      style={{
                        backgroundColor: bgColor + 20,
                        color: bgColor,
                      }}
                    >
                      {project.name}
                    </span>
                    <h4 className="mt-3 text-sm font-medium">
                      {project.title}
                    </h4>
                    <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-1 leading-none">{date}</span>
                      </div>

                      <img
                        className="w-6 h-6 ml-auto rounded-full"
                        src={gravatarUrl(project.author)}
                        title={project.author}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* //Ready SECTION */}
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Ready</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              3
            </span>
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
                Dev
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/men/64.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DOING SECTION */}
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Doing</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              2
            </span>
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
                Dev
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/men/64.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* REviwe section */}
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Review</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              3
            </span>
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
                Dev
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/men/64.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full">
                Copywriting
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BLOCKED SECTION */}
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Blocked</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              1
            </span>
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DONE SECTION */}
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Done</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              3
            </span>
          </div>
          <div className="flex flex-col pb-2 overflow-auto">
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full">
                Copywriting
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full">
                Copywriting
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                Design
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
              draggable="true"
            >
              <span className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full">
                Dev
              </span>
              <h4 className="mt-3 text-sm font-medium">
                This is the title of the card for the thing that needs to be
                done.
              </h4>
              <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Dec 12</span>
                </div>

                <img
                  className="w-6 h-6 ml-auto rounded-full"
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-6"></div>
      </div>
      <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://rid1.xyz"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ridwan-dev.appspot.com/o/portfolio%2Fdp%2Frid1xyzdp?alt=media&token=14af4bd7-1396-4bc5-84dc-7f9ae2e93be2"
            alt="Logo"
            className="rounded-full"
          />
        </div>
        <span className="ml-1 text-sm leading-none">@rid1.xyz</span>
      </a>
    </div>
  );
};

export default Projects;
