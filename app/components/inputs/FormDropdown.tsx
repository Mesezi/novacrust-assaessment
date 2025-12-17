"use client";

import useClickOutside from "@/app/hooks/useClickOutside";
import React, { useRef, useState, ReactNode, useMemo } from "react";
import { useFormContext, get } from "react-hook-form";

interface FormDropdownProps {
  name: string;
  label?: string;
  options: { label: string; value: string | number; icon?: ReactNode, shortLabel?:string }[];
  placeholder?: string;
  value: string | number;
  className?: string;
  requiredIndicator?: boolean;
  disabled?: boolean;
  searchable?: boolean; // <-- new prop
}

const FormDropdown: React.FC<FormDropdownProps> = ({
  name,
  value,
  options,
  placeholder="Select",
  className,
  disabled,
  searchable = false, // default off
}) => {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdown = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(dropdown, () => setIsOpen(false));

  const handleToggle = () => {
    if (disabled) return;

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedHeight = Math.min(options.length * 40, 240);
      setOpenUpward(spaceBelow < estimatedHeight);
    }

    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string | number) => {
    setValue(name, option, { shouldTouch: true });
    setIsOpen(false);
    trigger(name);
    setSearchTerm(""); // reset search
  };

  const errorMessage = get(errors, name)?.message as string | undefined;

  const selectedOption = options.find((option) => option.value === value);
  const selectedValue = selectedOption?.shortLabel ?? selectedOption?.label ?? "";
  const selectedIcon = selectedOption?.icon


  // Filtered options when searchable
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options, searchable]);

  return (
    <div
      className={`relative w-full bg-customGray-100 border ring-offset-1 ring-offset-transparent focus:ring-2
        ring-primaryColor rounded-full border-[#D0D5DD] ${className ?? ""}`}
      ref={dropdown}
    >
      <button
        type="button"
        ref={buttonRef}
        onClick={handleToggle}
        disabled={disabled}
        className="flex h-full outline-none gap-2 items-center w-full px-4 sm:text-sm cursor-pointer disabled:opacity-50"
      >
        {selectedIcon}
        <span className="whitespace-nowrap overflow-hidden text-sm text-primaryColor">
          {selectedValue || placeholder}
        </span>
        

        <svg width="14" height="8" className={`duration-100 text-primaryColor shrink-0 ease-in-out ml-auto ${
            isOpen ? "rotate-180" : ""
          }`} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5675 1.06754L7.31754 7.31754C7.25949 7.37565 7.19056 7.42175 7.11469 7.4532C7.03881 7.48465 6.95748 7.50084 6.87535 7.50084C6.79321 7.50084 6.71188 7.48465 6.63601 7.4532C6.56014 7.42175 6.49121 7.37565 6.43316 7.31754L0.18316 1.06754C0.0658846 0.95026 0 0.7912 0 0.625347C0 0.459495 0.0658846 0.300435 0.18316 0.18316C0.300435 0.0658843 0.459495 0 0.625347 0C0.7912 0 0.95026 0.0658843 1.06753 0.18316L6.87535 5.99175L12.6832 0.18316C12.7412 0.125091 12.8102 0.0790281 12.886 0.0476015C12.9619 0.0161748 13.0432 0 13.1253 0C13.2075 0 13.2888 0.0161748 13.3647 0.0476015C13.4405 0.0790281 13.5095 0.125091 13.5675 0.18316C13.6256 0.241229 13.6717 0.310167 13.7031 0.386037C13.7345 0.461908 13.7507 0.543226 13.7507 0.625347C13.7507 0.707469 13.7345 0.788787 13.7031 0.864658C13.6717 0.940528 13.6256 1.00947 13.5675 1.06754Z" fill="#013941"/>
</svg>

      </button>

      {isOpen && (
        <div
          className={`absolute min-w-62.5 w-full text-sm
          bg-white border border-[#D0D5DD] rounded-xl z-400 right-0 p-3
          ${openUpward ? "bottom-[90%] mb-1" : "top-full mt-1"}`}
        >
        {searchable && (
  <div className="relative mb-3">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      className="w-full pl-9 pr-3 py-2 border border-[#D0D5DD] text-sm outline-none rounded-full"
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-customGray-400">
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9422 17.0578L14.0305 13.1469C15.1642 11.7857 15.7296 10.0398 15.6089 8.27244C15.4883 6.50506 14.6909 4.85223 13.3826 3.65779C12.0744 2.46334 10.356 1.81926 8.58492 1.85951C6.81388 1.89976 5.12653 2.62125 3.87389 3.87389C2.62125 5.12653 1.89976 6.81388 1.85951 8.58492C1.81926 10.356 2.46334 12.0744 3.65779 13.3826C4.85223 14.6909 6.50506 15.4883 8.27244 15.6089C10.0398 15.7296 11.7857 15.1642 13.1469 14.0305L17.0578 17.9422C17.1159 18.0003 17.1848 18.0463 17.2607 18.0777C17.3366 18.1092 17.4179 18.1253 17.5 18.1253C17.5821 18.1253 17.6634 18.1092 17.7393 18.0777C17.8152 18.0463 17.8841 18.0003 17.9422 17.9422C18.0003 17.8841 18.0463 17.8152 18.0777 17.7393C18.1092 17.6634 18.1253 17.5821 18.1253 17.5C18.1253 17.4179 18.1092 17.3366 18.0777 17.2607C18.0463 17.1848 18.0003 17.1159 17.9422 17.0578ZM3.125 8.75C3.125 7.63748 3.4549 6.54994 4.07298 5.62491C4.69106 4.69989 5.56957 3.97892 6.5974 3.55317C7.62524 3.12743 8.75624 3.01604 9.84738 3.23308C10.9385 3.45012 11.9408 3.98585 12.7275 4.77252C13.5141 5.55919 14.0499 6.56147 14.2669 7.65261C14.484 8.74376 14.3726 9.87476 13.9468 10.9026C13.5211 11.9304 12.8001 12.8089 11.8751 13.427C10.9501 14.0451 9.86252 14.375 8.75 14.375C7.25866 14.3733 5.82888 13.7802 4.77435 12.7256C3.71981 11.6711 3.12665 10.2413 3.125 8.75Z" fill="#828282"/>
</svg>
    </span>
  </div>
)}


          <section className="max-h-60 overflow-y-auto">

          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`flex items-center p-3 cursor-pointer rounded-2xl whitespace-nowrap  overflow-auto gap-2 hover:bg-[#F5F5F5] ${
                  value === option.value ? "bg-[#F5F5F5]" : ""
                }`}
              >
                {option.icon}
                <span className="flex items-center gap-2">
                  {option.label}
                </span>
              </div>
            ))
          ) : (
            <p>No options found</p>
          )}
          </section>
        </div>
      )}

      {errorMessage && (
        <p className="mt-1 text-xs font-semibold text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormDropdown;
