import React from "react";
import PropTypes from "prop-types";

const MyInput = ({
  label,
  required,
  setValue,
  placeholder,
  value,
  type,
  disabled,
}) => {
  return (
    <div className="my-2">
      {label && (
        <label htmlFor="address" className="text-gray-500 mb-2">
          {label} :
        </label>
      )}
      <input
        type={type ?? "text"}
        autoComplete="email"
        required={required ?? false}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

MyInput.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  setValue: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};
export default MyInput;
