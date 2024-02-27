import React from "react";
import { GoSearch } from "react-icons/go";
import "./index.css";

interface InputProps {
  name?: string;
  value?: string;
  className?: string;
  type?: "number" | "text" | "textarea" | "search";
  style?: React.CSSProperties;
  wrapperClassName?: string;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
}

const Input = (props: InputProps) => {
  if (props.type === "number") {
    return <NumberInput {...props} />;
  } else if (props.type === "text") {
    return <TextInput {...props} />;
  } else if (props.type === "textarea") {
    return <TextAreaInput {...props} />;
  } else if (props.type === "search") {
    return <SearchInput {...props} />;
  } else {
    return <TextInput {...props} />;
  }
};

export default Input;

const SearchInput = (props: InputProps) => {
  return (
    <div className={`input-wrapper ${props.wrapperClassName}`}>
      <div style={{ marginRight: 5 }}>
        <GoSearch />
      </div>
      <input
        placeholder={props.placeholder}
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type="text"
        style={{ outline: "none", border: "none", width: "100%" }}
      />
    </div>
  );
};

const TextInput = (props: InputProps) => {
  return (
    <div className={`input-wrapper ${props.wrapperClassName}`}>
      <input
        placeholder={props.placeholder}
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type="text"
        style={{ outline: "none", border: "none", width: "100%" }}
      />
    </div>
  );
};

const NumberInput = (props: InputProps) => {
  return (
    <div className={`input-wrapper ${props.wrapperClassName}`}>
      <input
        placeholder={props.placeholder}
        type="text"
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        style={{ outline: "none", border: "none", width: "100%" }}
      />
    </div>
  );
};

const TextAreaInput = (props: InputProps) => {
  return (
    <div className={props.wrapperClassName}>
      <textarea
        placeholder={props.placeholder}
        className={props.className}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.value}
      </textarea>
    </div>
  );
};
