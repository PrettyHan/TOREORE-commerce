import React from "react";

import Paypal from "./payments/Paypal";

function OrderPaymentCard({ orderPayment, setOrderPayment, subTotal }) {
  return (
    <>
      <Paypal subTotal={subTotal} />
    </>
  );
}

export default OrderPaymentCard;
