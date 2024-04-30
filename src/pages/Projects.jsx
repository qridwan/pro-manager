import { Menu } from "@headlessui/react";
import gravatarUrl from "gravatar-url";
import moment from "moment";
import React, { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { HTML5Backend } from "react-dnd-html5-backend";
import StatusSection from "../components/projects/StatusSection";

const Projects = () => {
  const auth = useSelector((state) => state.auth) || {};

  const {
    user: { email },
  } = auth || {};
  const { data: myProjects } = useGetProjectsQuery(email);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <StatusSection allowedDropEffect="backlog" projects={myProjects} />
        {/* //Ready SECTION */}
        <StatusSection allowedDropEffect="ready" projects={myProjects} />

        {/* DOING SECTION */}
        <StatusSection allowedDropEffect="doing" projects={myProjects} />

        {/* REviwe section */}
        <StatusSection allowedDropEffect="review" projects={myProjects} />

        {/* BLOCKED SECTION */}
        <StatusSection allowedDropEffect="blocked" projects={myProjects} />

        {/* DONE SECTION */}
        <StatusSection allowedDropEffect="done" projects={myProjects} />

        <div className="flex-shrink-0 w-6"></div>
      </div>
      <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://ridwan-dev.web.app"
        target="_blank"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ridwan-dev.appspot.com/o/portfolio%2Fdp%2Frid1xyzdp?alt=media&token=14af4bd7-1396-4bc5-84dc-7f9ae2e93be2"
            alt="#"
            className="rounded-full"
          />
        </div>
        <span className="ml-1 text-sm leading-none">@qridwan</span>
      </a>
    </DndProvider>
  );
};

export default Projects;
