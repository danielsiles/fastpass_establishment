import { createAction } from "@reduxjs/toolkit";

const actions = {
  inputChange: createAction("input/change", function prepare(
    formName,
    inputName,
    inputValue
  ) {
    return {
      payload: {
        formName: formName,
        inputName: inputName,
        inputValue: inputValue,
      },
    };
  }),
};
export default actions;
