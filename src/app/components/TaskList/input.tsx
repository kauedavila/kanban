import React, { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: ReactNode;
  className?: string;
};

const Input: React.FC<InputProps> = ({ children, className, ...props }) => {
  return (
    <input
      {...props}
      type="text"
      className={`
            px-1 w-full rounded-sm
            bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500
            ${className}`}
    >
      {children}
    </input>
  );
};

export default Input;
