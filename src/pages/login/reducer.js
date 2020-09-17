import { createReducer, createAction } from "@reduxjs/toolkit";
import {
  reduceAction,
  initState as initializeActionState,
} from "_utils/reducerUtil";
import actions from "./actions";

const initState = {
  [actions.LOGIN.NAME]: {},
  [actions.GET_USER_BY_CPF.NAME]: {},
  [actions.REGISTER_USER.NAME]: {},
  user: null,
  company: null
  // token: "",
  // loginUserStatus: "",
  // getUserStatus: "",
  // isLoggedIn: false,
  // user: null,
};

const authReducer = createReducer(initState, {
  ...reduceAction(actions.LOGIN),
  [actions.LOGIN.SUCCESS]: (state, action) => {
    state[actions.LOGIN.NAME].token = action.payload.loginUser.token;
    state.user = action.payload.loginUser.user;
    state.company = action.payload.loginUser.user.establishmentOwner?.company || action.payload.loginUser.user.establishmentStaff?.branch.company
    state[actions.LOGIN.NAME].loading = false;
    state[actions.LOGIN.NAME].error = false;
  },
  ...reduceAction(actions.GET_USER_BY_CPF),
  [actions.GET_USER_BY_CPF.SUCCESS]: (state, action) => {
    state[actions.GET_USER_BY_CPF.NAME].data = action.payload.getUserByCpf;
    state[actions.GET_USER_BY_CPF.NAME].loading = false;
    state[actions.GET_USER_BY_CPF.NAME].error = false;
  },
  [actions.REGISTER_USER.REQUEST]: (state, action) => {
    state[actions.REGISTER_USER.NAME].loading = true;
    state[actions.REGISTER_USER.NAME].error = false;
  },
  [actions.REGISTER_USER.SUCCESS]: (state, action) => {
    state[actions.REGISTER_USER.NAME].data = action.payload.registerUser;
    state[actions.REGISTER_USER.NAME].loading = false;
    state[actions.REGISTER_USER.NAME].error = false;
  },
  [actions.REGISTER_USER.FAILURE]: (state, action) => {
    state[actions.REGISTER_USER.NAME].errors = action.payload.errors[0].errors;
    state[actions.REGISTER_USER.NAME].loading = false;
    state[actions.REGISTER_USER.NAME].error = true;
  },
  [actions.LOGOUT]: (state, action) => {
    state[actions.LOGIN.NAME].token = null
  },
});

export default authReducer;
