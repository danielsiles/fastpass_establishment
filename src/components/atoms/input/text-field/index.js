import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import { useDispatch } from "react-redux";
import actions from "_atoms/input/actions";

import "./style.css";

const TextInput = (props) => {
  const dispatch = useDispatch();
  const handleChange = (input) => {
    dispatch(
      actions.inputChange(props.formName, props.name, input.target.value)
    );
  };

  return (
    <TextField
      {...props}
      className={"input " + props.className}
      onChange={handleChange}
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{props.icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default TextInput;
