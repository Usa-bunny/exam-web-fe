"use client";

import { useState } from "react";
import Button from "./button";
import { FunnelIcon } from "@phosphor-icons/react";
import { createPortal } from "react-dom";

export interface FilterOption<T = string> {
  label: string;
  value: T;
}

export interface FilterDropdownProps<T = string> {
  options: FilterOption<T>[];
  selectedValue?: T;
  onSelect: (value: T) => void;
  className?: string;
}

const FilterDropdown = <T extends string | number>({
  options = [],
  selectedValue,
  onSelect,
  className = "",
}: FilterDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = (e: any) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 192,
      });
      setIsOpen(true);
    }
  };

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Button variant="secondary" onClick={toggleDropdown} glossy>
        <FunnelIcon size={18} className="mr-2" />
        Filter
      </Button>

      {isOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-9998"
              onClick={() => setIsOpen(false)}
            />
            <div
              style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                width: "192px",
              }}
              className="z-9999 bg-white border border-[#e8ebf0] rounded-[15px] shadow-[0_6px_22px_-4px_rgba(16,24,40,0.1)] py-1.5 overflow-hidden animate-in fade-in zoom-in duration-150"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F8FAFD] transition-colors font-medium cursor-pointer ${
                    selectedValue === opt.value
                      ? "text-[#3843f6] bg-[#F8FAFD]"
                      : "text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};

export default FilterDropdown;
