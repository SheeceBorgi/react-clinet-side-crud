import React from "react";
import "./index.css";

interface IconProps {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  iconType: "button" | "submit";
}
const Icon = (props: IconProps) => {
  return (
    <button
      type={props.iconType}
      className="icon-wrapper"
      disabled={props.disabled}
      onClick={props.onClick}
      style={props.style}
    >
      {props.icon}
    </button>
  );
};

export default Icon;
