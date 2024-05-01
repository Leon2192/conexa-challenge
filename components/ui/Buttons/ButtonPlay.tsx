import React from "react";

interface ButtonPlayProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonPlay: React.FC<ButtonPlayProps> = ({
  href,
  onClick,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      className={`text-white bg-gradient-to-r from-red-500 to-purple-700 text-center py-2 px-3 rounded-full mt-8 mx-auto block mb-5 md:hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default ButtonPlay;
