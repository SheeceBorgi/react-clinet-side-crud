import React, { useMemo, useState } from "react";
import { GoChevronDown, GoChevronUp, GoPencil } from "react-icons/go";
import { IoTrashSharp } from "react-icons/io5";
import Icon from "../components/Icon";
import { formatDobToAge } from "../utils";
import { Celebrity, gender } from "./constants";
import Modal from "../components/Modal";
import Button from "../components/Button";

interface ViewDetailsProps {
  item: Celebrity;
  activeKey: number | null;
  onClick: (index: number) => void;
  currentIndex: number;
  isEdit: boolean;
  onEditClick: () => void;
  deleteHandler: (item: Celebrity) => void;
}

const ViewDetails = (props: ViewDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isAdult = useMemo(
    () => formatDobToAge(props?.item?.dob) >= "18",
    [props?.item?.dob]
  );

  return (
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
          <div className="bold">{`${props?.item?.first} ${props.item.last}`}</div>
        </div>
        {props.activeKey === props.currentIndex ? (
          <GoChevronUp fontSize={22} />
        ) : (
          <GoChevronDown fontSize={22} />
        )}
      </div>

      <div
        className={`accordion-item-details ${
          props.activeKey === props.currentIndex ? "active-accordion" : ""
        }`}
      >
        <div className="accordion-item-user-details">
          <div className="accordion-item-details-age">
            <div className="accordion-item-details-age-label">Age</div>
            <div className="accordionitem-details-label-text">
              {formatDobToAge(props?.item?.dob)} Years
            </div>
          </div>

          <div className="accordion-item-details-gender">
            <div className="accordion-item-details-gender-label">Gender</div>
            <div className="accordionitem-details-label-text">
              {gender[props?.item?.gender as keyof typeof gender]}
            </div>
          </div>

          <div className="accordion-item-details-country">
            <div className="accordion-item-details-country-label">Country</div>
            <div className="accordionitem-details-label-text">
              {props?.item?.country}
            </div>
          </div>
        </div>

        <div className="accordion-item-details-description">
          <div className="accordion-item-details-description-label">
            Description
          </div>
          <div className="accordionitem-details-label-text">
            {props?.item?.description}
          </div>
        </div>
        <div className="accordion-item-footer">
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div>
              <div className="modal-text">Are you sure you want to delete?</div>
              <div className="modal-footer">
                <Button
                  title="Cancel"
                  buttonDisplayType="outlined"
                  onClick={() => setIsModalOpen(false)}
                />
                <Button
                  title="Delete"
                  buttonDisplayType="primary"
                  onClick={() => {
                    props.deleteHandler(props.item);
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </div>
          </Modal>
          <Icon
            icon={<IoTrashSharp fontSize={22} color="#ff3500" />}
            onClick={() => setIsModalOpen(true)}
            iconType="button"
          />
          <Icon
            icon={<GoPencil fontSize={22} color="#007aff" />}
            onClick={props.onEditClick}
            iconType="button"
            disabled={!isAdult}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
