import React from "react";

import { Table, TableHead, TableRow, TableBody } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import OrderTableCell from "./OrderTableCell";
import OrderItem from "./OrderItem";

function OrderItemCard({ orderItems }) {
  const orderItemList = orderItems.map((item, index) => (
    <OrderItem item={item} index={index + 1} />
  ));

  const isPc = useMediaQuery("(min-width:480px)");
  return (
    <>
      {isPc ? (
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
      ) : (
        <>{orderItemList}</>
      )}
    </>
  );
}

export default OrderItemCard;
