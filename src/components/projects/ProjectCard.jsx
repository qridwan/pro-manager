import { Menu } from "@headlessui/react";
import gravatarUrl from "gravatar-url";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import {
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
} from "../../features/projects/projectsApi";
import { ItemTypes } from "../../utils/dragTypes";
import { DeleteActiveIcon, DeleteInactiveIcon } from "../teams/TeamCardMenu";

const ProjectCard = ({ project, status }) => {
  const auth = useSelector((state) => state.auth) || {};
  const date = moment(project.timestamp).format("MMM Do YY");
  const bgColor = project.color;
  const { data: searchedData } = useSelector((state) => state.searched) || {};
  const isHighlighted = Boolean(searchedData?.find((p) => p.id === project.id));
  const [deleteProject] = useDeleteProjectMutation(); //delete project hook

  const {
    user: { email },
  } = auth || {};
  const [updateProjectStatus, { isLoading, isError, error, isSuccess }] =
    useUpdateProjectStatusMutation();
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.ProjectCard,
      item: { project },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          let alertMessage = "";
          const isDropAllowed = dropResult.allowedDropEffect !== status;
          if (isDropAllowed) {
            handleProjectEdit(item.project, dropResult.allowedDropEffect);
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}! \n The item is already in ${dropResult.name} section`;
            console.log("<<=== alertMessage: ==>>", alertMessage);
          }
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [project]
  );

  const handleDelete = (id, author) => {
    if (author === email) {
      console.log("id: ", id);
      deleteProject({ id: id, sender: email });
    } else null;
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       alert("project status updated!");
  //     }
  //   }, [isLoading]);
  const handleProjectEdit = (item, status) => {
    const constructData = {
      ...item,
      status: status,
    };
    updateProjectStatus({ data: constructData, sender: email, id: item.id });
  };

  return (
    <div
      ref={drag}
      style={{ opacity }}
      key={project.id}
      className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${
        isHighlighted ? "border-2 border-blue-500" : ""
      }`}
      draggable="true"
    >
      {project.status === "backlog" && (
        <div className="absolute right-2 top-1">
          <Menu as="div" className="relative inline-block text-left ">
            <Menu.Button className="flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Menu.Button
                    onClick={() => handleDelete(project.id, project.author)}
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
                  </Menu.Button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      )}
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
      <h4 className="mt-3 text-sm font-medium">{project.title}</h4>
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
              clipRule="evenodd"
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
};

export default ProjectCard;
