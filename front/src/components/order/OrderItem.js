import React from "react";
import { TableRow } from "@mui/material";
import OrderTableCell from "./OrderTableCell";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";

function OrderItem({ item, index }) {
  const isPc = useMediaQuery("(min-width:480px)");
  return (
    <div>
      {isPc ? (
        <TableRow key={item.productId}>
          <OrderTableCell>{index}</OrderTableCell>
          <OrderTableCell>
            <img src={item.image} alt={item.name} style={{ width: 100 }} />
          </OrderTableCell>
          <OrderTableCell>{item.name}</OrderTableCell>
          <OrderTableCell>{item.price}</OrderTableCell>
          <OrderTableCell>{item.price * item.quantity}</OrderTableCell>
          <OrderTableCell>{item.quantity}</OrderTableCell>
        </TableRow>
      ) : (
        <MobileItems sx={{ margin: 2, border: 1 }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 100, marginTop: 10 }}
          />
          <p>{item.name}</p>
          <p>{item.price}</p>
        </MobileItems>
      )}
    </div>
  );
}
const MobileItems = styled.div`
  box-shadow: black 0px 0px 0px 1px, #dddfdf 5px 5px 0px 0px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
  padding: 5px 40px 5px 40px;
`;

export default OrderItem;
