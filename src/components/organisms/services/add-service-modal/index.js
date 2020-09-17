import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Person from "@material-ui/icons/Person";
import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import "./style.css";
// Mudar set modal para o selector da store (useSelector)
const AddServiceModal = ({
  open,
  setModal,
  workingTimeGroups,
  handleAddService,
}) => {
  const closeModal = () => setModal(false);

  return (
    <Modal open={open} onClose={closeModal}>
      <h2>Novo serviço</h2>
      <TextInput
        formName="addServiceForm"
        name="name"
        label="Nome do serviço"
      />
      <TextInput
        formName="addServiceForm"
        name="serviceLetter"
        label="Letra do serviço"
      />
      <Select
        style={{ marginLeft: 15 }}
        formName="addServiceForm"
        items={workingTimeGroups.data}
        loading={workingTimeGroups.loading}
        defaultItem="Selecione o grupo de horário..."
        name="workingTimeGroupId"
      />
      <Button redTheme label="Criar serviço" onClick={handleAddService} />
    </Modal>
  );
};

export default AddServiceModal;
