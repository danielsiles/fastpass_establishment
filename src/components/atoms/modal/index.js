import React from "react";
import { Modal as MaterialModal } from "@material-ui/core";

import "./style.css";

const Modal = ({ open, onClose, children }) => {
  return (
    <MaterialModal open={open} onClose={onClose} className="modalContainer">
      <div className="modalContent">{children}</div>
    </MaterialModal>
  );
};

export default Modal;
