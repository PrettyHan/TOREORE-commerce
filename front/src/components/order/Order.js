import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material/";

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
      setOrderItems(products);
      setOrderPayment({
        paymentMethod,
        isPayed,
      });
      setSubTotal(totalPrice);
    } catch (err) {
      console.log(err);
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
        <Box sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: 240, p: 2 }}
          >
            <OrderUserCard setOrderUser={setOrderUser}></OrderUserCard>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 240,
              p: 2,
              mt: 5,
            }}
          >
            <OrderItemCard orderItems={orderItems}></OrderItemCard>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 240,
              p: 2,
              mt: 5,
            }}
          >
            <OrderPaymentCard
              orderPayment={orderPayment}
              setOrderPayment={setOrderPayment}
              subTotal={subTotal}
              handlePayComplete={handlePayComplete}
              orderId={orderId}
            ></OrderPaymentCard>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Order;
