import React from "react";

import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";

import "./style.css";
// Mudar set modal para o selector da store (useSelector)
const CallNextTicketModal = ({
  open,
  services,
  setModal,
  onClick,
  errorMsg,
  defaultItem,
}) => (
  <Modal open={open} onClose={() => setModal(false)}>
    <Select
      defaultItem={defaultItem || "Qualquer serviço"}
      formName="serviceSelect"
      name="service"
      label="Guiches"
      items={services}
      loading={false}
    />
    <Button
      label="Chamar Próximo"
      className="callNextButton"
      onClick={onClick}
    />
    <div className="errorMsg">{errorMsg}</div>
  </Modal>
);

export default CallNextTicketModal;
