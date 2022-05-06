import React from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

import Paypal from "./payments/Paypal";
import Bankbook from "./payments/Bankbook";
import CreditCard from "./payments/CreditCard";
import KakaoPay from "./payments/KakaoPay";

function OrderPaymentCard({
  orderUser,
  orderPayment,
  setOrderPayment,
  subTotal,
  handlePayComplete,
  orderId,
}) {
  const handlePaymentCheck = (event) => {
    setOrderPayment((current) => {
      return {
        ...current,
        paymentMethod: event.target.value,
      };
    });
  };

  // const handlePaymentChange = (orderPayment) => {
  //   if (orderPayment.paymentMethod === "paypal") {
  //     setOrderPayment((current) => {
  //       return {
  //         ...current,
  //         paymentMethod: "paypal",
  //       };
  //     });
  //     return (
  // <Paypal
  //   subTotal={subTotal}
  //   handlePayComplete={handlePayComplete}
  //   setOrderPayment={setOrderPayment}
  // />
  //     );
  //   } else if (orderPayment.paymentMethod === "bankbook") {
  //     setOrderPayment((current) => {
  //       return {
  //         ...current,
  //         paymentMethod: "bankbook",
  //       };
  //     });
  //     return <Bankbook handlePayComplete={handlePayComplete} />;
  //   } else if (orderPayment.paymentMethod === "card") {
  //     setOrderPayment((current) => {
  //       return {
  //         ...current,
  //         paymentMethod: "card",
  //       };
  //     });
  //     return (
  // <Card
  //   subTotal={subTotal}
  //   handlePayComplete={handlePayComplete}
  //   orderId={orderId}
  //   setOrderPayment={setOrderPayment}
  // />;
  //     );
  //   }
  // };

  return (
    <Box>
      <Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="payment-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={orderPayment.paymentMethod}
            onChange={handlePaymentCheck}
          >
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="페이팔"
            />
            <FormControlLabel
              value="bankbook"
              control={<Radio />}
              label="무통장 입금"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="신용/체크카드"
            />
            <FormControlLabel
              value="kakaoPay"
              control={<Radio />}
              label="카카오페이"
            />
          </RadioGroup>
        </FormControl>
        {orderUser.zipcode !== null ? (
          {
            none: (
              <Box style={{ alignItems: "center", justifyContent: "center" }}>
                <Typography>결제 수단을 선택해 주세요.</Typography>
              </Box>
            ),
            paypal: (
              <Paypal
                orderUser={orderUser}
                subTotal={subTotal}
                handlePayComplete={handlePayComplete}
                setOrderPayment={setOrderPayment}
              />
            ),
            card: (
              <CreditCard
                orderUser={orderUser}
                subTotal={subTotal}
                handlePayComplete={handlePayComplete}
                orderId={orderId}
                setOrderPayment={setOrderPayment}
              />
            ),
            bankbook: (
              <Bankbook
                subTotal={subTotal}
                handlePayComplete={handlePayComplete}
                setOrderPayment={setOrderPayment}
              />
            ),
            kakaoPay: (
              <KakaoPay
                orderUser={orderUser}
                subTotal={subTotal}
                handlePayComplete={handlePayComplete}
                orderId={orderId}
                setOrderPayment={setOrderPayment}
              />
            ),
          }[orderPayment.paymentMethod]
        ) : (
          <Typography>주소를 입력해 주세요.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default OrderPaymentCard;
