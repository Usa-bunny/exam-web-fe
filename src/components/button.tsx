"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "ghostDestructive";
  size?: "sm" | "md" | "lg";
  glossy?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  glossy = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "relative inline-flex items-center justify-center overflow-hidden rounded-[10px] font-medium transition-all focus:outline-none disabled:cursor-not-allowed active:scale-[0.98] whitespace-nowrap";

  const sizes = {
    sm: "h-[32px] px-[12px] text-[12px]",
    md: "h-[40px] px-[16px] text-[14px]",
    lg: "h-[48px] px-[20px] text-[16px]",
  };

  const variants = {
    primary: "text-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]",
    secondary: glossy
      ? "text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
      : "bg-white border border-[#e3e6eb] text-[#344054] hover:bg-[#f8fafc] hover:border-[#cfd4dc]",
    outline:
      "bg-transparent border border-[#e3e6eb] text-[#344054] hover:bg-[#f8fafc] hover:border-[#cfd4dc]",
    destructive: "text-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]",
    ghost: "bg-transparent text-[#344054] hover:bg-[#f8fafc]",
    ghostDestructive: "bg-transparent text-[#D82B1F] hover:bg-[#ffe6e6]",
  };

  const isPrimary = variant === "primary";
  const isDestructive = variant === "destructive";
  const isSecondaryGlossy = variant === "secondary" && glossy;

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className} group cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {isPrimary && (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-[#424cff] to-[#3641f5]" />
          <div className="absolute -inset-px rounded-[10px] border border-[#6a72fb] pointer-events-none shadow-[inset_0px_0px_2px_0px_#fcfcfc,inset_0px_-1px_1px_1px_#192096]" />
        </>
      )}

      {isDestructive && (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-[#f22f33] to-[#de1b1b]" />
          <div className="absolute -inset-px rounded-[10px] border border-[#de1b1b] pointer-events-none shadow-[inset_0px_0px_2px_0px_#fcfcfc,inset_0px_-1px_1px_1px_#8e0000]" />
        </>
      )}

      {isSecondaryGlossy && (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-[#FAFAFA] to-[#FFFFFF]" />
          <div className="absolute inset-0 rounded-[11px] pointer-events-none shadow-[inset_0px_-1.5px_1px_0px_#C0C0C0,inset_0px_1px_1px_0px_#FFFFFF]" />
          <div className="absolute inset-0 rounded-[11px] border border-[#DCDCDC] pointer-events-none z-10" />
        </>
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
