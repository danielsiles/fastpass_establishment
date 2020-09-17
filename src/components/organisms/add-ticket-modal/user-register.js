import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import "./style.css";
import { Email, Person, Phone, Fingerprint } from "@material-ui/icons";

const UserRegister = ({ registerUser, cpf, errors }) => (
  <>
    <TextInput
      icon={<Person />}
      label="Digite o nome completo"
      formName="registerUser"
      name="name"
      error={!!errors.first_name || !!errors.last_name}
      helperText={errors.first_name || errors.last_name}
    />
    <TextInput
      icon={<Fingerprint />}
      label="Digite um CPF válido"
      formName="registerUser"
      name="cpf"
      value={cpf}
      disabled
    />
    <TextInput
      icon={<Email />}
      label="Digite um e-mail válido"
      formName="registerUser"
      name="email"
      error={!!errors.email}
      helperText={errors.email}
    />
    <TextInput
      icon={<Phone />}
      label="Digite o telefone"
      formName="registerUser"
      name="phoneNumber"
      error={!!errors.phone_number}
      helperText={errors.phone_number}
    />
    <Button
      label="Cadastrar"
      className="callNextButton"
      onClick={registerUser}
    />
  </>
);

export default UserRegister;
