import React from "react";
import "./index.css";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  buttonDisplayType: "primary" | "outlined";
  style?: React.CSSProperties;
}
const Button = (props: ButtonProps) => {
  return (
    <button
      type="button"
      style={props.style}
      className={`${
        props.buttonDisplayType === "primary"
          ? "btn primary-btn"
          : props.buttonDisplayType === "outlined"
          ? "btn outlined-btn"
          : "btn"
      }`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default Button;
