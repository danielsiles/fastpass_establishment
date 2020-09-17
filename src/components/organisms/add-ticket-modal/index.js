import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Person from "@material-ui/icons/Person";
import Select from "_atoms/input/select";
import Modal from "_atoms/modal";
import Button from "_atoms/button";
import TextInput from "_atoms/input/text-field";

import TicketCreate from "./ticket-create";
import UserSearch from "./user-search";
import UserRegister from "./user-register";

import authActions from "_pages/login/actions";
import ticketActions from "_pages/ticket/actions";

import "./style.css";
// Mudar set modal para o selector da store (useSelector)
const AddTicketModal = ({ open, setModal, onClick }) => {
  const dispatch = useDispatch();
  const services = useSelector(
    (state) => state.ticket.get_branch?.data?.services
  );
  const cpf = useSelector((state) => state.input.addTicket?.cpf);
  const selectedService = useSelector(
    (state) => state.input.ticketCreate?.service
  );
  const user = useSelector((state) => state.auth.get_user_by_cpf?.data);
  const registerForm = useSelector((state) => state.input.registerUser);

  const [step, setStep] = useState("userSearch");
  const [errors, setErrors] = useState({});

  const searchUser = () => {
    if (cpf) {
      dispatch(
        authActions.getUserByCpf(
          cpf,
          () => {
            setStep("ticketCreate");
          },
          () => {
            setStep("userRegister");
          }
        )
      );
    }
  };

  const createTicket = () => {
    dispatch(ticketActions.hostCreateTicket(user.id, selectedService, false));
    closeModal();
  };

  const registerUser = () => {
    if (registerForm) {
      const data = {
        firstName: registerForm.name?.split(" ")[0],
        lastName: registerForm.name?.split(" ")[1],
        email: registerForm.email,
        password: registerForm.password,
        cpf: cpf?.replace(".", "").replace(".", "").replace("-", ""),
        phoneNumber: registerForm.phoneNumber,
      };
      dispatch(
        authActions.registerUser(
          data,
          () => {
            searchUser();
          },
          (err) => {
            setErrors(err.errors[0].errors);
          }
        )
      );
    }
  };

  const closeModal = () => {
    setStep("userSearch");
    setModal(false);
  };

  const steps = {
    userSearch: <UserSearch searchUser={searchUser} />,
    ticketCreate: (
      <TicketCreate services={services} user={user} onClick={createTicket} />
    ),
    userRegister: (
      <UserRegister registerUser={registerUser} cpf={cpf} errors={errors} />
    ),
  };

  return (
    <Modal open={open} onClose={closeModal}>
      {steps[step]}
    </Modal>
  );
};

export default AddTicketModal;
