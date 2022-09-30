import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const TeamCardMenu = ({ openModel }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <Menu.Button
                onClick={openModel}
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                {active ? (
                  <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                ) : (
                  <EditInactiveIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                )}
                Add member
              </Menu.Button>
            )}
          </Menu.Item>
        </div>
        {/* 
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-900"
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
        </div> */}
      </Menu.Items>
    </Transition>
  );
};

export default TeamCardMenu;

// ========
// ICONS
// ========

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

export function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#e80b0b"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#e80b0b" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#e80b0b" strokeWidth="2" />
    </svg>
  );
}

export function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#e80b0b"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#e80b0b" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#e80b0b" strokeWidth="2" />
    </svg>
  );
}
