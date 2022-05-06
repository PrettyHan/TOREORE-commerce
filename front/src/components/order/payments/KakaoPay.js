import React from "react";

import { Button, Box } from "@mui/material";

import * as Api from "../../../api";

function CreditCard({
  orderUser,
  subTotal,
  orderId,
  orderPayment,
  setOrderPayment,
}) {
  const onClickPayment = async () => {
    await setOrderPayment((current) => {
      const newCurrent = {
        ...current,
        isPayed: true,
      };
      return newCurrent;
    });
    const body = {
      zipcode: orderUser.zipcode,
      message: orderUser.message,
      ...orderPayment,
    };
    try {
      await Api.put(`orders/${orderId}`, body);
      const res = await Api.post(`payments/ready/${orderId}`, body);
      const tid = res.data.tid;
      const paymentURL = res.data.next_redirect_pc_url;
      window.localStorage.setItem("tid", tid);
      window.open(paymentURL);
    } catch (err) {
      alert("결제 실패", err);
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Button onClick={onClickPayment}>{subTotal}원 주문하기</Button>
    </Box>
  );
}

export default CreditCard;
