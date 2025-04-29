"use client";
import React from "react";

interface ButtonProps {
  className: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  className,
  onClick,
  children,
  disabled,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
