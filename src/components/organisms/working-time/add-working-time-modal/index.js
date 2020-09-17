import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Person from "@material-ui/icons/Person";
import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import "./style.css";
// Mudar set modal para o selector da store (useSelector)
const AddWorkingTimeModal = ({ open, setModal, handleAddWorkingTime }) => {
  const closeModal = () => setModal(false);

  return (
    <Modal open={open} onClose={closeModal}>
      <h2>Novo horário</h2>
      <TextInput
        formName="addWorkingTimeForm"
        name="name"
        label="Nome do horário"
      />
      {[
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ].map((weekDay, index) => (
        <div className="weekDayWrapper">
          <div className="weekDayName">{weekDay}:</div>
          <TextInput
            formName="addWorkingTimeForm"
            name={"openTime_" + index}
            label="Abertura"
          />
          <TextInput
            formName="addWorkingTimeForm"
            name={"closeTime_" + index}
            label="Fechamento"
          />
        </div>
      ))}
      <Button
        redTheme
        label="Criar grupo de horários"
        onClick={handleAddWorkingTime}
      />
    </Modal>
  );
};

export default AddWorkingTimeModal;
