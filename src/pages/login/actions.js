import { query } from "_utils/httpRequest";
import { LOGIN_USER, GET_USER_BY_CPF, REGISTER_USER } from "./queries";
import { createAction } from "_utils/actionUtil";

const actions = {
  LOGIN: createAction("LOGIN"),
  GET_USER_BY_CPF: createAction("GET_USER_BY_CPF"),
  REGISTER_USER: createAction("REGISTER_USER"),
  LOGOUT: "LOGOUT",
  loginUser: (
    userName,
    password,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      email: userName,
      password: password,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.LOGIN,
          LOGIN_USER,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  getUserByCpf: (
    cpf,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      cpf: cpf,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_USER_BY_CPF,
          GET_USER_BY_CPF,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  registerUser: (
    data,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      cpf: data.cpf || "",
      phoneNumber: data.phoneNumber || "",
      email: data.email || "",
      password: "djoiwajdaowi",
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.REGISTER_USER,
          REGISTER_USER,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  logout: () => {
    return {
      type: actions.LOGOUT,
    };
  },
};
export default actions;
