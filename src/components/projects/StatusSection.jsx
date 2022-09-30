import React, { useState } from "react";
import { useDrop } from "react-dnd";
import calcProjectLength from "../../utils/calProjectLength";
import { selectBackgroundColor } from "../../utils/dndbg";
import { ItemTypes } from "../../utils/dragTypes";
import AddProject from "../dialogs/AddProject";
import ProjectCard from "./ProjectCard";

const StatusSection = ({ projects, allowedDropEffect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ProjectCard,
      drop: () => ({
        name: `${allowedDropEffect}`,
        allowedDropEffect,
      }),
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [allowedDropEffect]
  );
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">
          {allowedDropEffect.toUpperCase()}
        </span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {calcProjectLength(projects, allowedDropEffect)}
        </span>
        {allowedDropEffect === "backlog" && (
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
        )}
        <AddProject closeModal={closeModal} isOpen={isOpen} />
      </div>
      <div
        ref={drop}
        style={{ backgroundColor }}
        className="flex flex-col pb-2 overflow-auto min-h-[70vh]"
      >
        {projects
          ?.slice()
          .sort((a, b) => b.timestamp - a.timestamp)
          .filter((p) => p.status === allowedDropEffect)
          .map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                status={project.status}
              />
            );
          })}
      </div>
    </div>
  );
};

export default StatusSection;
