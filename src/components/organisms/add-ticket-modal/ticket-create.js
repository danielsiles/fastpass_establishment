import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Person from "@material-ui/icons/Person";
import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import "./style.css";

const TicketCreate = ({ services, user, onClick }) => {
  return (
    <>
      <div>{user.firstName + " " + user.lastName}</div>
      <div>{user.phoneNumber}</div>
      <div>{user.cpf}</div>
      <Select
        defaultItem={"Selecione o serviço..."}
        formName="ticketCreate"
        name="service"
        label="service"
        items={services}
        loading={false}
      />
      <Button
        label="Criar Ticket"
        className="callNextButton"
        onClick={onClick}
      />
      {/* <div className="errorMsg">{errorMsg}</div> */}
    </>
  );
};

export default TicketCreate;
