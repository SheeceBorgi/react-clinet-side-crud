import React, { useEffect, useMemo, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";

import {
  AccordionItemProps,
  Celebrity,
  Option,
  alphabetRegexWithSpace,
  formProps,
  numberRegex,
} from "./constants";
import Icon from "../components/Icon";
import Input from "../components/Input";
import { formatDobToAge } from "../utils";
import DropDown from "../components/Select";

interface EditDetailsProps extends AccordionItemProps {
  item: Celebrity;
  activeKey: number | null;
  onClick: (index: number) => void;
  currentIndex: number;
  isEdit: boolean;
  onCancel: () => void;
  onSubmit: (formData: formProps) => void;
}

const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "transgender", label: "Transgender" },
  { value: "rather_not_say", label: "Rather not say" },
  { value: "other", label: "Other" },
];

const EditDetails = (props: EditDetailsProps) => {
  const [formData, setFormData] = useState<formProps>({
    fullName: "",
    age: "",
    gender: "",
    country: "",
    description: "",
  });

  const isFormNotUpdated = useMemo(() => {
    if (
      formData.fullName === `${props.item.first} ${props.item.last}` &&
      formData.age === formatDobToAge(props.item.dob) &&
      formData.gender === props.item.gender &&
      formData.country === props.item.country &&
      formData.description === props.item.description
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    formData.age,
    formData.country,
    formData.description,
    formData.fullName,
    formData.gender,
    props.item.country,
    props.item.description,
    props.item.dob,
    props.item.first,
    props.item.gender,
    props.item.last,
  ]);

  useEffect(() => {
    if (props.isEdit) {
      const currentCelebrity = props.item;
      setFormData({
        fullName: `${currentCelebrity.first} ${currentCelebrity.last}`,
        age: formatDobToAge(currentCelebrity.dob),
        gender: currentCelebrity.gender,
        country: currentCelebrity.country,
        description: currentCelebrity.description,
      });
    }
  }, [props.isEdit, props.item]);

  const updateFormData = (value: string, name: string) => {
    switch (name) {
      case "fullName": {
        if (!value || alphabetRegexWithSpace.test(value)) {
          setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
        break;
      }
      case "country": {
        if (!value || alphabetRegexWithSpace.test(value)) {
          setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
        break;
      }
      case "age": {
        if (!value || numberRegex.test(value)) {
          setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
        break;
      }
      default: {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        break;
      }
    }
  };

  const dropdownHandler = (option: Option | null) => {
    setFormData((prevState) => ({ ...prevState, gender: option?.value || "" }));
  };

  const getDropDownValue = (value: string): Option | undefined => {
    if (!value) return undefined;
    return genderOptions.find((item) => item.value === value);
  };

  return (
    <form name="editCelebrityDetails">
      <div className="accordion-container">
        <div
          className="accordion-item-header"
          onClick={() => {
            !props.isEdit && props.onClick(props.currentIndex);
          }}
        >
          <div className="accordion-header-left">
            <img
              className="accordion-item-header-image"
              src={props.item.picture}
              alt={props.item.first}
            />
            <Input
              className="bold"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => updateFormData(e.target.value, "fullName")}
              type="text"
            />
          </div>
          <div>
            {props.activeKey === props.currentIndex ? (
              <GoChevronUp fontSize={22} />
            ) : (
              <GoChevronDown fontSize={22} />
            )}
          </div>
        </div>

        <div
          className={`accordion-item-details ${
            props.activeKey === props.currentIndex ? "active-accordion" : ""
          }`}
        >
          <div className="accordion-item-user-details">
            <div className="accordion-item-details-age">
              <div className="accordion-item-details-age-label">Age</div>
              <Input
                name="age"
                value={formData.age}
                onChange={(e) => updateFormData(e.target.value, "age")}
                type="number"
              />
            </div>

            <div className="accordion-item-details-gender">
              <div className="accordion-item-details-gender-label">Gender</div>
              <div>
                <DropDown
                  value={getDropDownValue(formData.gender)}
                  options={genderOptions}
                  onChange={dropdownHandler}
                />
              </div>
            </div>

            <div className="accordion-item-details-country">
              <div className="accordion-item-details-country-label">
                Country
              </div>
              <Input
                name="country"
                value={formData.country}
                onChange={(e) => updateFormData(e.target.value, "country")}
                type="text"
              />
            </div>
          </div>

          <div className="accordion-item-details-description">
            <div className="accordion-item-details-description-label">
              Description
            </div>
            <Input
              name="description"
              value={formData.description}
              onChange={(e) => updateFormData(e.target.value, "description")}
              type="textarea"
            />
          </div>
          <div className="accordion-item-footer">
            <Icon
              icon={<MdOutlineCancel fontSize={22} color="#ff3500" />}
              onClick={props.onCancel}
              style={{ margin: "5px 0px" }}
              iconType="button"
            />
            <Icon
              icon={<MdOutlineCheckCircle fontSize={22} color="#38b000" />}
              style={{ margin: "5px 0px" }}
              iconType="button"
              onClick={() => props.onSubmit(formData)}
              disabled={isFormNotUpdated}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditDetails;
