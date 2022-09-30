import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewTeamMemberMutation } from "../../features/teams/teamsAPI";
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from "../ui/Error";
import MyInput from "../ui/MyInput";
import SelectMemberAutoComplete from "../ui/SelectMemberAutoComplete";

const AddTeamMember = ({ isOpen, closeOpen, team }) => {
  const auth = useSelector((state) => state.auth) || {};
  const { user } = auth || {};
  const { email } = user || {};
  const [addNewTeamMember, { data: updatedTeam, isLoading, isError, error }] =
    useAddNewTeamMemberMutation();
  const { data: users } = useGetUserQuery();
  const [memberSuggestion, setMemberSuggestion] = useState([]);
  const [selected, setSelected] = useState("");

  const reset = () => {
    setSelected("");
    setMemberSuggestion([]);
  };
  useEffect(() => {
    let suggestions = users;
    reset();
    if (users?.length > 0) {
      team?.members?.forEach((mail) => {
        suggestions = [...suggestions?.filter((user) => user.email !== mail)];
      });
      setMemberSuggestion(suggestions);
    } else {
      reset();
    }
  }, [users, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      sender: email,
      id: team.id,
      data: {
        ...team,
        members: [...team.members, selected.email],
      },
    });

    if (team && selected) {
      addNewTeamMember({
        sender: email,
        id: team.id,
        data: {
          ...team,
          members: [...team.members, selected.email],
        },
      });
      closeOpen();
      reset();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeOpen}>
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
              <Dialog.Panel className="w-full max-w-md  transform overflowY-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add New Team Member
                </Dialog.Title>
                <div className="mt-10">
                  <form onSubmit={handleSubmit} className="mt-2">
                    <MyInput
                      id="team_name"
                      placeholder=""
                      value={team?.name}
                      setValue={null}
                      label="Team Name"
                      disabled
                      type="text"
                    />
                    <SelectMemberAutoComplete
                      selected={selected}
                      label="Choose a member"
                      setSelected={setSelected}
                      suggestions={memberSuggestion}
                    />
                    <div className="mt-10 flex justify-center">
                      {selected && (
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-white disabled:text-gray-500"
                        >
                          Add
                        </button>
                      )}
                      {isError && <Error message={error} />}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTeamMember;
