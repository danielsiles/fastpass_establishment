import React from "react";
import { Select as MaterialSelect } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import actions from "_atoms/input/actions";

import "./style.css";

const Select = (props) => {
  const { label, items, loading, defaultItem, onSelect } = props;
  const dispatch = useDispatch();
  const currentValue = useSelector((state) => {
    return state.input[props.formName]
      ? state.input[props.formName][props.name]
      : "";
  });
  const handleChange = (input) => {
    if(onSelect){
      onSelect(input.target.value)
    }

    dispatch(
      actions.inputChange(props.formName, props.name, input.target.value)
    );
  };

  return (
    <MaterialSelect
      value={currentValue ? currentValue : 0}
      onChange={handleChange}
      label={label}
      className="select-outlined"
      {...props}
    >
      <MenuItem value={0}>{defaultItem}</MenuItem>
      {!loading &&
        items?.length > 0 &&
        items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
    </MaterialSelect>
  );
};

export default Select;
