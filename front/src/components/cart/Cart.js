import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box, Button, Checkbox } from "@mui/material/";
import CartItem from "./CartItem";

import * as Api from "../../api";

function Cart() {
  const navigate = useNavigate();

  const fakeData = [
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
  ];

  const [cartItems, setCartItems] = useState(fakeData);

  const fetchCartItems = async () => {
    try {
      const res = await Api.get("carts");

      setCartItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const cartItemList = cartItems.map((cartItem) => (
    <CartItem cartItem={cartItem} setCartItems={setCartItems} />
  ));

  const checkedCartItems = cartItems.filter(
    (cartItem) => cartItem.checked === true
  );
  const carculateTotal = checkedCartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <div>
      <Box>
        <Grid>
          <Typography>장바구니</Typography>
        </Grid>
        <Grid>
          <Checkbox>모두 선택</Checkbox>
          {Array.isArray(cartItems) && cartItems.length === 0 ? (
            cartItemList
          ) : (
            <Typography>장바구니에 상품을 담지 않았습니다.</Typography>
          )}
          <Button>선택 삭제</Button>
        </Grid>
        <Grid>
          <Typography>총 결제 금액: {carculateTotal}원</Typography>
        </Grid>
        <Grid>
          <Button
            variant="text"
            onClick={() => navigate("/order", { cartItems: checkedCartItems })}
          >
            결제하기
          </Button>
        </Grid>
      </Box>
    </div>
  );
}

export default Cart;
