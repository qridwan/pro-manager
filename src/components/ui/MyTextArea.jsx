import React from "react";
import PropTypes from "prop-types";

const MyTextArea = ({
  label,
  required,
  setValue,
  placeholder,
  value,
  type,
}) => {
  return (
    <div>
      <label htmlFor="address" className="text-gray-500 mb-2">
        {label} :
      </label>
      <textarea
        required={required ?? false}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

MyTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
export default MyTextArea;
