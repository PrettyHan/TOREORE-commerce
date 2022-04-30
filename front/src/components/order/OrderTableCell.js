import * as React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";

function OrderTableCell(props) {
  return <TableCell align="center">{props.children}</TableCell>;
}

OrderTableCell.propTypes = {
  children: PropTypes.node,
};

export default OrderTableCell;
