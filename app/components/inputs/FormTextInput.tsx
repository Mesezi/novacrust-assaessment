"use client";

import React from "react";
import { useFormContext, get } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormTextInputProps {
  name: string;
  placeholder?: string;
  type?: string;
  showError?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  placeholder,
  type = "text",
  disabled = false,
  className,
  showError = true,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = get(errors, name)?.message as string | undefined;
  const inputClass = twMerge(`
  relative w-full border ring-offset-1 ring-offset-transparent focus:ring-2
  ring-primaryColor rounded-full border-[#D0D5DD] h-14 aria-disabled:bg-customGray-100
  [type=number]::-webkit-inner-spin-button:[-webkit-appearance-none] 
  [type=number]::-webkit-outer-spin-button:[-webkit-appearance-none]
  [type=number]:-moz-appearance-textfield
  ${className} ${
    errorMessage && showError
      ? "border-red-500"
      : "border-[#D0D5DD] focus-within:ring-2 focus:border-none ring-primaryColor"
  }
`);

  return (
    <div className="w-full relative">
      <div
        aria-disabled={disabled}
        className={inputClass}
        onClick={(e) => {
          if (!disabled) {
            const input = e.currentTarget.querySelector("input");
            input?.focus();
          }
        }}
      >
        <input
          type={type}
          id={name}
          {...register(name)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-full px-4 outline-none rounded-full overflow-hidden placeholder:font-normal placeholder:text-customGray-300 text-primaryColor"
        />
      </div>

      {errorMessage && showError && (
        <p className="mt-1 text-xs font-semibold text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormTextInput;
