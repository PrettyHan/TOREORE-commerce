import * as React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";

function CartTableCell(props) {
  return <TableCell align="center">{props.children}</TableCell>;
}

CartTableCell.propTypes = {
  children: PropTypes.node,
};

export default CartTableCell;
