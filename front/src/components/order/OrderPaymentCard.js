import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import Paypal from "./payments/Paypal";
import Bankbook from "./payments/Bankbook";
import Card from "./payments/Card";

function OrderPaymentCard({
  orderPayment,
  setOrderPayment,
  subTotal,
  handlePayComplete,
  orderId,
}) {
  const [payment, setPayment] = useState(orderPayment);

  const handlePaymentCheck = (event) => {
    setPayment(event.target.value);
  };

  const handlePaymentChange = (payment) => {
    if (payment === "paypal") {
      setOrderPayment((current) => {
        return {
          ...current,
          paymentMethod: "paypal",
        };
      });
      return (
        <Paypal
          subTotal={subTotal}
          handlePayComplete={handlePayComplete}
          setOrderPayment={setOrderPayment}
        />
      );
    } else if (payment === "bankbook") {
      setOrderPayment((current) => {
        return {
          ...current,
          paymentMethod: "bankbook",
        };
      });
      return <Bankbook handlePayComplete={handlePayComplete} />;
    } else if (payment === "card") {
      setOrderPayment((current) => {
        return {
          ...current,
          paymentMethod: "card",
        };
      });
      return (
        <Card
          subTotal={subTotal}
          handlePayComplete={handlePayComplete}
          orderId={orderId}
          setOrderPayment={setOrderPayment}
        />
      );
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 180px)" }}>
      <Box>
        <Box>
          <FormControl>
            <FormLabel id="payment-row-radio-buttons-group-label">
              결제수단
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="payment-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={payment}
              onChange={handlePaymentCheck}
            >
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="paypal"
              />
              <FormControlLabel
                value="bankbook"
                control={<Radio />}
                label="bankbook"
              />
              <FormControlLabel value="card" control={<Radio />} label="card" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>{handlePaymentChange}</Box>
      </Box>
    </div>
  );
}

export default OrderPaymentCard;
