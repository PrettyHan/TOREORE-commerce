import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material/";

import OrderItemCard from "./OrderItemCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderUserCard from "./OrderUserCard";

import * as Api from "../../api";

function Order() {
  const [orderUser, setOrderUser] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [orderPayment, setOrderPayment] = useState(null);

  const { orderId } = useParams();
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const res = await Api.get(`orders/${orderId}`);

      const {
        userId,
        products,
        totalPrice,
        zipcode,
        message,
        paymentMethod,
        isPayed,
      } = res.data;
      setOrderUser({
        userId,
        zipcode,
        message,
      });
      setOrderItems({
        products,
        totalPrice,
      });
      setOrderPayment({
        paymentMethod,
        isPayed,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayButton = async () => {
    try {
      //   결제창을 띄우고 결제가되면
      // if (handlePay) {
      //     await Api.put(`orders/${orderId}`)
      //     return navigate("/order/complete")
      // }
      // 결제에 실패하면
      // else {
      // alert(`결제에 성공하지 못했습니다.`)
      // return navigate(0)
      // }
    } catch (err) {
      alert(`결제에 성공하지 못했습니다 \n ${err}`);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      <OrderUserCard
        orderUser={orderUser}
        setOrderUser={setOrderUser}
      ></OrderUserCard>
      <OrderItemCard orderItems={orderItems}></OrderItemCard>
      <OrderPaymentCard
        orderPayment={orderPayment}
        setOrderPayment={setOrderPayment}
      ></OrderPaymentCard>
      <Button onClick={handlePayButton}>
        {orderItems.totalPrice}원 결제하기
      </Button>
    </>
  );
}

export default Order;
