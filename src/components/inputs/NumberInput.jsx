"use client";
import { useState } from "react";

export default function NumberInput({
  className = "",
  min = 0,
  icon = null,
  error = "",
  textColor = "text-gray-900 dark:text-white",
  borderColor = "border-gray-300 dark:border-gray-600",
  focusColor = "focus:border-blue-600 dark:focus:border-blue-500",
  labelColor = "text-gray-500 dark:text-gray-400",
  focusLabelColor = "peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
  errorColor = "text-red-500 dark:text-red-400",
  placeholder = "",
  id = "",
  onChange = () => {},
  onBlur = () => {},

  // step = "any",
  // disabled = false,
  // name = "",
  // ref = null,
  // value = null,
  // defaultValue = null,
  // required = false,
  // max,
  // readOnly = false,
  ...props
}) {
  const hasError = Boolean(error);
  const [isFocused, setIsFocused] = useState(false);

  // Determine icon color
  let iconColorClass = "text-gray-400 dark:text-gray-300";
  if (hasError) iconColorClass = errorColor;
  else if (isFocused) iconColorClass = focusColor;

  return (
    <div className={`relative w-full mb-1 ${className}`}>
      {icon && (
        <div
          className={`absolute top-2.5 right-3 flex items-center pointer-events-none ${iconColorClass}`}
        >
          {icon}
        </div>
      )}

      <input
        type="number"
        min={min}
        placeholder=" "
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        className={`
          block w-full py-2.5 ${icon ? "pr-12" : "pr-2"} pl-2 text-sm bg-transparent border-0 border-b-2
          ${textColor}
          ${
            hasError
              ? `border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400`
              : `${borderColor} ${focusColor}`
          }
          appearance-none focus:outline-none focus:ring-0 peer
        `}
        id={id}

        // step={step}
        // disabled={disabled}
        // name={name}
        // ref={ref}
        // value={value}
        // defaultValue={defaultValue}
        // required={required}
        // max={max}
        // readOnly={readOnly}
        {...props}
      />

      <label
        htmlFor={id}
        className={`
          absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6
          ${hasError ? `peer-focus:${errorColor} ${errorColor}` : `${labelColor} ${focusLabelColor}`}
        `}
      >
        {placeholder}
      </label>

      <div className="min-h-[1.25rem] mt-1">
        {hasError && <p className={`text-sm ${errorColor}`}>{error}</p>}
      </div>
    </div>
  );
}
