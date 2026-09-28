"use client";

import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: ReactNode;
}

const Input = ({
  label,
  id,
  type = "text",
  className = "",
  suffix,
  ...props
}: InputProps) => {
  return (
    <div
      className={`flex flex-col gap-1 items-start justify-center w-full ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          className="font-medium text-[#344054] text-[14px] tracking-[-0.28px]"
        >
          {label}
        </label>
      )}

      <div className="bg-white border border-[#e2e5ea] shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex h-10 items-center overflow-hidden px-3 py-[7.5px] rounded-[10.5px] w-full transition-all focus-within:border-[#3b47f7] focus-within:ring-2 focus-within:ring-[#3b47f7]/10">
        <input
          id={id}
          type={type}
          className="bg-transparent border-none flex-1 font-normal outline-none text-[14px] text-[#344054] placeholder:text-[#98a2b3] tracking-[-0.5px] w-full"
          {...props}
        />
        {suffix && (
          <div className="ml-2 flex items-center justify-center">{suffix}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
