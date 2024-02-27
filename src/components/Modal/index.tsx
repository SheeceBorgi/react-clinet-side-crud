import React from "react";
import { MdOutlineClose } from "react-icons/md";
import "./index.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div
      className={`modal-container ${
        props.isOpen ? "modal-open" : "modal-close"
      }`}
    >
      <div className="modal-wrapper">
        <div className="modal">
          <MdOutlineClose className="modal-close-icon" onClick={props.onClose} />
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
