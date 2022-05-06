import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Bankbook({ subTotal, handlePayComplete, setOrderPayment }) {
  const onClickPayment = (event) => {
    setOrderPayment((current) => {
      return {
        ...current,
        isPayed: false,
      };
    });
    handlePayComplete();
  };
  return (
    <Box>
      <Typography>엘리스은행 943202-00-050562 TOREOLRE</Typography>
      <Button onClick={onClickPayment}>{subTotal}원 주문하기</Button>
    </Box>
  );
}

export default Bankbook;
