import React from "react";
import { Button, TableRow, Checkbox } from "@mui/material";
import CartTableCell from "./CartTableCell";

// import * as Api from "../../api";

function CartItem({ cartItem, setCartItems, index }) {
  // 삭제 핸들링 함수
  const handleRemove = async () => {
    try {
      if (window.confirm("상품을 삭제 하시겠습니까?")) {
        // await Api.delete(`carts/select`, {
        //   productIdArr: [cartItem.productId]
        // })
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

  // 수량 추가 핸들링 함수
  const handlePlus = async () => {
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

  // 수량 감소 핸들링 함수
  const handleMinus = async () => {
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
              quantity: /*newQuantity*/ cartItem.quantity - 1,
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

  // 체크박스 핸들링 함수
  const handleCheck = (event) => {
    setCartItems((current) => {
      return current.map((item) => {
        if (item.productId === cartItem.productId) {
          return {
            ...item,
            checked: event.target.checked,
          };
        }
        return item;
      });
    });
  };

  return (
    <TableRow key={cartItem.productId}>
      <CartTableCell>{index}</CartTableCell>
      <CartTableCell>
        <Checkbox checked={cartItem.checked} onChange={handleCheck} />
      </CartTableCell>
      <CartTableCell>
        <img src={cartItem.image} alt={cartItem.name} />
      </CartTableCell>
      <CartTableCell>{cartItem.name}</CartTableCell>
      <CartTableCell>{cartItem.price}</CartTableCell>
      <CartTableCell>{cartItem.price * cartItem.quantity}</CartTableCell>
      <CartTableCell>
        <Button onClick={handleMinus} disabled={cartItem.quantity <= 1}>
          -
        </Button>
        {cartItem.quantity}
        <Button onClick={handlePlus}>+</Button>
      </CartTableCell>
      <CartTableCell align="center">
        <Button onClick={handleRemove}>삭제하기</Button>
      </CartTableCell>
    </TableRow>
  );
}

export default CartItem;
