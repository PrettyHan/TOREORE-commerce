import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function Bankbook({ orderUser, subTotal, setOrderPayment, orderPayment }) {
  const navigate = useNavigate();

  const onClickPayment = (event) => {
    setOrderPayment((current) => {
      return {
        ...current,
        isPayed: false,
      };
    });
    navigate("complete", { state: { orderUser, orderPayment } });
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography>엘리스은행 943202-00-050562 TOREOLRE</Typography>
      <Button onClick={onClickPayment}>{subTotal}원 주문하기</Button>
    </Box>
  );
}

export default Bankbook;
