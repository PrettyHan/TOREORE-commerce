import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Box } from "@mui/material";

function CreditCard({
  orderUser,
  subTotal,
  orderId,
  setOrderPayment,
  orderPayment,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp62990898");
    const buyer_addr = [
      orderUser.zipcode.address1,
      orderUser.zipcode.address2,
    ].join();
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: orderId,
      amount: subTotal,
      buyer_email: "elice@test.com",
      buyer_name: "엘리스",
      buyer_tel: "010-1234-5678",
      buyer_addr,
      buyer_postcode: "123-456",
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      setOrderPayment((current) => {
        const newCurrent = {
          ...current,
          isPayed: true,
        };
        return newCurrent;
      });
      console.log("결제 성공");
      navigate("complete", { state: { orderUser, orderPayment } });
    } else {
      console.log(`결제 실패 : ${error_msg}`);
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
