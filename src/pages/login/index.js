import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import TextInput from "_atoms/input/text-field";
import Button from "_atoms/button";
import "./style.css";

import actions from "./actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.input.auth);
  const loading = useSelector((state) => state.auth?.login?.loading);

  const submitForm = () => {
    dispatch(actions.loginUser("d@s.com", "123456"));
    // dispatch(actions.loginUser(form.email, form.password, () => {}));
  };

  return (
    <div className="authContainer">
      <div className="logo">FastPass</div>
      <div className="loginContainer">
        <div className="authImageContainer">FastPass</div>
        <Divider orientation="vertical" className="authFormDivider" />
        <div className="authFormContainer">
          <div className="authFormTitleDetail" />
          <div className="authFormTitle">Faça o Login como Admin</div>
          <TextInput
            icon={<AccountCircle />}
            label="E-mail"
            formName="auth"
            name="email"
            autoCapitalize="none"
          />
          <TextInput
            icon={<AccountCircle />}
            label="Senha"
            formName="auth"
            name="password"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button onClick={submitForm} label="Login" loading={loading} />
          <div className="authFormForgotPassword">Esqueceu sua senha?</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
