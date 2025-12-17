"use client";

import React, { useEffect, useRef, useState } from "react";

interface TabOption {
  label: React.ReactNode;
  value: string;
}

interface TabToggleProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabToggle: React.FC<TabToggleProps> = ({
  options,
  activeTab,
  onTabChange,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to update indicator position
  const updateIndicatorPosition = () => {
    if (!containerRef.current) return;
    const activeButton = containerRef.current.querySelector(
      `[data-value="${activeTab}"]`
    ) as HTMLElement;

    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  };

  // Run when active tab changes
  useEffect(() => {
    updateIndicatorPosition();
  }, [activeTab, options]);

  // Run on window resize
  useEffect(() => {
    window.addEventListener("resize", updateIndicatorPosition);
    window.addEventListener("orientationchange", updateIndicatorPosition);

    return () => {
      window.removeEventListener("resize", updateIndicatorPosition);
      window.removeEventListener("orientationchange", updateIndicatorPosition);
    };
  }, [activeTab, options]);

  return (
    <div
      ref={containerRef}
      className='relative bg-[#F2F2F2] border border-[#EAECF0] rounded-full text-sm flex gap-1 w-fit lg:w-full min-h-8 overflow-x-auto'
    >
      {/* Sliding indicator */}
      <span
        className="absolute top-0 h-full bg-primaryColor rounded-full shadow-sm transition-all duration-300 ease-in-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />

      {options.map((option) => {
        const isActive = activeTab === option.value;
        return (
          <button
            key={option.value}
            data-value={option.value}
            type="button"
            className={`cursor-pointer relative grow whitespace-nowrap text-xs z-10 transition-colors duration-200 ${
              isActive
                ? "text-[#F8FEFB]"
                : "text-customGray-300"
            } px-4 py-1 rounded-md`}
            onClick={() => onTabChange(option.value)}
          >
            <p className="flex gap-1 items-center justify-center">
              {option.label} 
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default TabToggle;
