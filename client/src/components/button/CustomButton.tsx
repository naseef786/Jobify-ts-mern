import React, { ReactNode, MouseEventHandler } from "react";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyles,
  iconRight,
  type = "button",
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center ${containerStyles || ""}`}
    >
      {title}

      {iconRight && <div className='ml-2'>{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
