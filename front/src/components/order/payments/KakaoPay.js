import React, { useEffect } from "react";

import { Button, Box } from "@mui/material";

import * as Api from "../../../api";

function CreditCard({
  orderUser,
  subTotal,
  handlePayComplete,
  orderId,
  setOrderPayment,
}) {
  const onClickPayment = async () => {
    try {
      const res = await Api.post(`payments/ready/${orderId}`);
      const tid = res.data.tid;
      const paymentURL = res.data.next_redirect_pc_url;

      window.localStorage.setItem("tid", tid);
      window.open(paymentURL);
    } catch (err) {
      alert("결제 실패", err);
    }
  };
  return (
    <Box>
      <Button onClick={onClickPayment}>{subTotal}원 주문하기</Button>
    </Box>
  );
}

export default CreditCard;
