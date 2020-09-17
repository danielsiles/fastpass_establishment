import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button as MaterialUIButton } from "@material-ui/core";

import "./style.css";

const Button = (props) => {
  const { loading, label, className } = props;
  return (
    <MaterialUIButton
      onClick={props.onClick}
      className={"button " + className}
      variant="contained"
      // {...props}
    >
      {!loading && label}
      {loading && <CircularProgress className="circularProgress" />}
    </MaterialUIButton>
  );
};

export default Button;
