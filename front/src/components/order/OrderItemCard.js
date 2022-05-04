import React from "react";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import OrderTableCell from "./OrderTableCell";
import OrderItem from "./OrderItem";

function OrderItemCard({ orderItems }) {
  const orderItemList = orderItems.map((item, index) => (
    <OrderItem item={item} index={index + 1} />
  ));
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <OrderTableCell>전체 {orderItems.length}개</OrderTableCell>
            <OrderTableCell>이미지</OrderTableCell>
            <OrderTableCell>상품명</OrderTableCell>
            <OrderTableCell>판매가</OrderTableCell>
            <OrderTableCell>주문금액</OrderTableCell>
            <OrderTableCell>수량</OrderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{orderItemList}</TableBody>
      </Table>
    </>
  );
}

export default OrderItemCard;
