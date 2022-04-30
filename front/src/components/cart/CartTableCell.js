import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function CartTableCell(props) {
  return <Typography align="center">{props.children}</Typography>;
}

CartTableCell.propTypes = {
  children: PropTypes.node,
};

export default CartTableCell;
