import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material/";
import styled from "styled-components";

import OrderItemCard from "./OrderItemCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderUserCard from "./OrderUserCard";

import * as Api from "../../api";

function Order() {
  const [orderUser, setOrderUser] = useState({
    userId: "",
    zipcode: {},
    message: "",
  });
  const [orderItems, setOrderItems] = useState([]);
  const [orderPayment, setOrderPayment] = useState({
    paymentMethod: "",
    isPayed: false,
  });
  const [subTotal, setSubTotal] = useState(0);

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
      setOrderItems(products[0].cart);
      setOrderPayment({
        paymentMethod,
        isPayed,
      });
      setSubTotal(totalPrice);
    } catch (err) {
      alert("주문페이지 생성에 실패하였습니다.", err);
      navigate(-1);
    }
  };

  const handlePayComplete = async () => {
    try {
      const body = {
        ...orderUser,
        totalPrice: subTotal,
        products: orderItems,
        ...orderPayment,
      };
      await Api.put(`orders/${orderId}`, body);
      return navigate("/order/complete");
    } catch (err) {
      alert(`결제에 성공하지 못했습니다 \n ${err}`);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      <div div style={{ minHeight: "calc(100vh - 180px)" }}>
        <Container>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            주소
          </Typography>
          <OrderContainer>
            <OrderUserCard setOrderUser={setOrderUser}></OrderUserCard>
          </OrderContainer>

          <Typography
            align="center"
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            상품 목록
          </Typography>
          <OrderContainer>
            <OrderItemCard orderItems={orderItems}></OrderItemCard>
          </OrderContainer>
          <Typography
            align="center"
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            결제
          </Typography>
          <OrderContainer>
            <OrderPaymentCard
              orderPayment={orderPayment}
              setOrderPayment={setOrderPayment}
              subTotal={subTotal}
              handlePayComplete={handlePayComplete}
              orderId={orderId}
            ></OrderPaymentCard>
          </OrderContainer>
        </Container>
      </div>
    </>
  );
}

export default Order;

const Container = styled.div`
  margin: 30px 0 100px 0;
  display: grid;
  row-gap: 20px;
  place-items: center center;
`;

const OrderContainer = styled(Box)`
  width: 61%;
  box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
`;

const ItemsContainer = styled(Box)`
  width: 63.5%;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const Items = styled.div`
  box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
  width: 24%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  cursor: pointer;
`;
