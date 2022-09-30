import { Combobox, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import React, { Fragment, useState } from "react";

const SelectTeamAutoComplete = ({
  suggestions,
  selected,
  setSelected,
  label,
} = []) => {
  const [query, setQuery] = useState("");
  const filteredItems =
    query === ""
      ? suggestions
      : suggestions?.filter((obj) =>
          obj.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className=" w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="">
            {label && (
              <label htmlFor="address" className="text-gray-500 mb-2">
                {label} :
              </label>
            )}
            <Combobox.Input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              displayValue={(selected) => (selected ? `${selected?.name}` : "")}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"></Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems?.map((team) => (
                  <Combobox.Option
                    key={team.uid}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={team}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {team.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
SelectTeamAutoComplete.propTypes = {
  label: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default SelectTeamAutoComplete;
