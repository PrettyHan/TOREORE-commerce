import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material/";

import OrderItemCard from "./OrderItemCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderUserCard from "./OrderUserCard";

import * as Api from "../../api";

function Order() {
  const fakeData = {
    userId: 1234,
    products: [
      {
        productId: 1234,
        quantity: 1,
        price: 10000,
        name: "울 블렌드 스웨터",
        image: "image1.com",
        checked: true,
      },
      {
        productId: 2345,
        quantity: 2,
        price: 20000,
        name: "캐시미어 블렌드 스웨터",
        image: "image2.com",
        checked: true,
      },
      {
        productId: 3456,
        quantity: 3,
        price: 30000,
        name: "프리미엄 캐시미어 스웨터",
        image: "image3.com",
        checked: true,
      },
    ],
    totalPrice: 500000,
    zipcode: {
      address1: "경기도 의정부시 금신로415번길 7",
      address2: "2층 오른쪽",
    },
    message: "잘 갖다주셈",
    paymentMethod: "kakao",
    isPayed: false,
  };

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

  const { orderId } = useParams();
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      // const res = await Api.get(`orders/${orderId}`);

      const res = fakeData;
      const {
        userId,
        products,
        totalPrice,
        zipcode,
        message,
        paymentMethod,
        isPayed,
      } = res;
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
      <div div style={{ minHeight: "calc(100vh - 180px)" }}>
        <Box>
          <Box>
            <OrderUserCard setOrderUser={setOrderUser}></OrderUserCard>
          </Box>
          <Box>
            <OrderItemCard orderItems={orderItems}></OrderItemCard>
          </Box>
          <Box>
            <OrderPaymentCard
              orderPayment={orderPayment}
              setOrderPayment={setOrderPayment}
            ></OrderPaymentCard>
          </Box>
          <Box>
            <Button onClick={handlePayButton}>
              {orderItems.totalPrice}원 결제하기
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Order;
