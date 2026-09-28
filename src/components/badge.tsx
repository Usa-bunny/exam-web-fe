"use client";

import { HTMLAttributes, ReactNode } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "secondary";
  size?: "sm" | "md";
}

const Badge = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
}: BadgeProps) => {
  const sizeStyles = {
    sm: "px-2.5 py-0.5",
    md: "px-2.5 py-1.5",
  };
  const paddingStyle = sizeStyles[size] || sizeStyles.sm;
  const baseStyle = `${paddingStyle} rounded-[5px] text-sm font-medium whitespace-nowrap flex items-center justify-center w-fit`;

  const variants = {
    primary: "bg-[#EBF2FF] text-[#3540f2]",
    success: "bg-[#EAFDF2] text-[#027946]",
    warning: "bg-[#FFF9EB] text-[#DB6603]",
    danger: "bg-[#FEF2F1] text-[#B32217]",
    secondary: "bg-[#F8FAFD] text-[#333F53]",
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
