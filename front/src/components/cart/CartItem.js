import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

// import * as Api from "../../api";

function CartItem({ cartItem, setCartItems }) {
  const removeHandler = async () => {
    try {
      if (window.confirm("상품을 삭제 하시겠습니까?")) {
        // await Api.delete(`carts/${cartItem.productId}`)
        setCartItems((current) => {
          return current.filter(
            (item) => item.productId !== cartItem.productId
          );
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const plusHandler = async () => {
    try {
      // const res = await Api.put(`carts/${cartItem.productId}`, {
      //   quantity: cartItem.quantity + 1
      // });
      // const newQuantity = res.data
      setCartItems((current) => {
        return current.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              quantity: /*newQuantity*/ cartItem.quantity + 1,
            };
          }
          return item;
        });
      });
      alert("수량이 수정되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const minusHandler = async () => {
    try {
      // const res = await Api.put(`carts/${cartItem.productId}`, {
      //   quantity: cartItem.quantity + 1
      // });
      // const newQuantity = res.data
      setCartItems((current) => {
        return current.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              quantity: /*newQuantity*/ cartItem.quantity + 1,
            };
          }
          return item;
        });
      });
      alert("수량이 수정되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <img src={cartItem.image} alt={cartItem.name} />
      <Grid>
        {cartItem.name}
        <Button onClick={removeHandler}>X</Button>
      </Grid>
      <Grid>
        <Typography>판매가: {cartItem.price}원</Typography>
        <Typography>
          주문금액: {cartItem.price * cartItem.quantity}원
        </Typography>
      </Grid>
      <Grid>
        <Button onClick={plusHandler}>+</Button>
        <Typography>{cartItem.quantity}</Typography>
        <Button onClick={minusHandler}>-</Button>
      </Grid>
    </Box>
  );
}

export default CartItem;
