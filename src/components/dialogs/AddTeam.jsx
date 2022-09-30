import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddTeamMutation,
  useGetQueryTeamsQuery,
} from "../../features/teams/teamsAPI";
import { debounceHandler } from "../../utils/debounceHandler";
import Error from "../ui/Error";
import MyInput from "../ui/MyInput";
import MyTextArea from "../ui/MyTextArea";

const AddTeam = ({ isOpen, closeModal }) => {
  const auth = useSelector((state) => state.auth) || {};
  const { user } = auth || {};
  const { email } = user || {};
  const [team, setTeam] = useState("");
  const [teamCheck, setTeamCheck] = useState(false);
  const [description, setDescription] = useState("");
  const defaultColor = "#232323";
  const [color, setColor] = useState(defaultColor);
  const [addTeam, { isLoading, isError }] = useAddTeamMutation();
  const { data: queryTeamData } = useGetQueryTeamsQuery(team, {
    skip: !teamCheck,
  });

  const reset = () => {
    setTeam("");
    setDescription("");
    setColor(defaultColor);
  };

  const doTeamQuery = (value) => {
    setTeamCheck(true);
    setTeam(value);
  };

  const handleQueryTeam = debounceHandler(doTeamQuery, 800);

  const handleSubmit = (e) => {
    e.preventDefault();
    queryTeamData;
    console.log("queryTeamData: ", queryTeamData, team);
    if (team && description && color && queryTeamData.length === 0) {
      addTeam({
        sender: email,
        data: {
          name: team,
          uid: team.toLowerCase(),
          members: [email],
          description,
          timestamp: Date.now(),
          color,
        },
      });
      closeModal();
      reset();
    }
  };

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add New Team
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-2">
                  <MyInput
                    label="Team Name"
                    id="team_name"
                    placeholder="Backend team"
                    // value={team}
                    setValue={handleQueryTeam}
                    required={true}
                    type="text"
                  />
                  <MyTextArea
                    label="Description"
                    id="team_name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Team Description"
                    value={description}
                    setValue={setDescription}
                    required={true}
                    type="text"
                  />
                  <div>
                    <MyInput
                      label="Team Color"
                      id="team_name"
                      placeholder="Select Your Team Color"
                      value={color}
                      setValue={setColor}
                      required={true}
                      type="color"
                    />
                    <div className="flex justify-end">
                      <div
                        style={{ background: color }}
                        className={`w-6 h-6`}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    {queryTeamData?.length > 0 ? (
                      <Error message="Team already exist!" />
                    ) : (
                      <button
                        disabled={Boolean(queryTeamData?.length > 0)}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-white disabled:text-gray-500"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTeam;
