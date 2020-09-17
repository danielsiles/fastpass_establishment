import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const initState = {};

const inputReducer = createReducer(initState, {
  [actions.inputChange]: (state, action) => {
    if (!state[action.payload.formName]) {
      state[action.payload.formName] = {};
      state[action.payload.formName][action.payload.inputName] =
        action.payload.inputValue;
    } else {
      state[action.payload.formName][action.payload.inputName] =
        action.payload.inputValue;
    }
  },
});

export default inputReducer;
