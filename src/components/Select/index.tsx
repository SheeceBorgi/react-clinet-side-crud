import React from "react";
import { GoChevronDown } from "react-icons/go";
import Select from "react-select";
import { Option } from "../../App/constants";

interface DropDownProps {
  value?: Option;
  options?: Option[];
  onChange?: (option: Option | null) => void;
}
const DropDown = (props: DropDownProps) => {
  const colorSelected = "#ff3500";
  const colorHover = "#ff724d";

  return (
    <Select
      maxMenuHeight={100}
      styles={{
        control: (provided, state) => ({
          ...provided,
          marginTop: 10,
          border: "1px solid #c4c4c8",
          height: "10px",
          borderColor: state.isFocused ? "#c4c4c8" : "#c4c4c8",
          borderRadius: "10px",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#c4c4c8",
          },
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? colorSelected
            : isFocused
            ? colorHover
            : undefined,
          color: isSelected || isFocused ? "white" : "black",
          "&:hover": {
            backgroundColor: colorHover,
            color: "white",
          },
        }),
      }}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <GoChevronDown style={{ marginRight: 10 }} />,
      }}
      value={props.value}
      options={props.options}
      onChange={props.onChange}
    />
  );
};

export default DropDown;
