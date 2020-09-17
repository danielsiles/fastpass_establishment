import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Person from "@material-ui/icons/Person";
import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import "./style.css";

const UserSearch = ({ searchUser }) => {
  return (
    <>
      <TextInput
        icon={<Person />}
        label="Digite o CPF"
        formName="addTicket"
        name="cpf"
        autoCapitalize="none"
      />
      <Button label="Próximo" className="callNextButton" onClick={searchUser} />
    </>
  );
};

export default UserSearch;
