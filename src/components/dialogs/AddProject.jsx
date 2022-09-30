import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddProjectMutation,
  useGetProjectsQuery,
} from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamsAPI";
import Error from "../ui/Error";
import MyTextArea from "../ui/MyTextArea";
import SelectTeamAutoComplete from "../ui/SelectTeamAutoComplete";

const AddProject = ({ isOpen, closeModal }) => {
  const [team, setTeam] = useState("");
  const [title, setTitle] = useState("");
  const auth = useSelector((state) => state.auth) || {};
  const {
    user: { email },
  } = auth || {};
  const { data: myTeams } = useGetTeamsQuery(email);
  const [addProject, { isLoading, isSuccess, isError, error }] =
    useAddProjectMutation();
  const [teamsSuggestion, setTeamsSuggestion] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    reset();
    if (myTeams?.length > 0) {
      setTeamsSuggestion(myTeams);
      setSelected(myTeams[0]);
    } else {
      reset();
    }
  }, [myTeams, isOpen]);
  useEffect(() => {
    if (isSuccess) {
      closeModal();
      reset();
    }
  }, [isLoading]);

  const reset = () => {
    setTitle("");
    setSelected("");
    setTeamsSuggestion([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected && title) {
      const dataModel = {
        author: email,
        color: selected.color,
        teamId: selected.uid,
        title: title,
        timestamp: Date.now(),
        members: [...selected.members],
        name: selected.name,
        status: "backlog",
      };
      addProject({ sender: email, data: dataModel });
    }
  };

  //function

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflowY-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-10">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add New Project
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-2">
                 
                  <SelectTeamAutoComplete
                    selected={selected}
                    label="Choose a team"
                    setSelected={setSelected}
                    suggestions={teamsSuggestion}
                  />
                  <MyTextArea
                    label="To-Dos"
                    id="title"
                    placeholder="TO-DOs"
                    value={title}
                    setValue={setTitle}
                    required={true}
                    type="text"
                  />
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                  {isError && <Error message={error} />}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProject;
