import React from "react";
import { TableRow } from "@mui/material";
import OrderTableCell from "./OrderTableCell";

function OrderItem({ item, index }) {
  return (
    <TableRow key={item.productId}>
      <OrderTableCell>{index}</OrderTableCell>
      <OrderTableCell>
        <img src={item.image} alt={item.name} />
      </OrderTableCell>
      <OrderTableCell>{item.name}</OrderTableCell>
      <OrderTableCell>{item.price}</OrderTableCell>
      <OrderTableCell>{item.price * item.quantity}</OrderTableCell>
      <OrderTableCell>{item.quantity}</OrderTableCell>
    </TableRow>
  );
}

export default OrderItem;
