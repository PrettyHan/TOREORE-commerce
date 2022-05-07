import React from "react";
import { Button, TableRow, Checkbox, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CartTableCell from "./CartTableCell";
import styled from "styled-components";

import * as Api from "../../api";

function CartItemCard({ cartItem, setCartItems, index }) {
  const isPc = useMediaQuery("(min-width:480px)");
  // 삭제 핸들링 함수
  const handleRemove = async () => {
    try {
      const body = {
        productIdArr: [cartItem.productId],
      };
      if (window.confirm("상품을 삭제 하시겠습니까?")) {
        await Api.delete(`carts/select`, "", body);
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
      await Api.put(`carts/${cartItem.productId}`, {
        quantity: cartItem.quantity + 1,
        checked: cartItem.checked,
      });
      setCartItems((current) => {
        return current.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              quantity: cartItem.quantity + 1,
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
      await Api.put(`carts/${cartItem.productId}`, {
        quantity: cartItem.quantity - 1,
        checked: cartItem.checked,
      });

      setCartItems((current) => {
        return current.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              quantity: cartItem.quantity - 1,
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
  const handleCheck = async () => {
    try {
      const itemChecked = cartItem.checked;

      await Api.put(`carts/${cartItem.productId}`, {
        quantity: cartItem.quantity,
        checked: !itemChecked,
      });
      setCartItems((current) => {
        return current.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              checked: !itemChecked,
            };
          }
          return item;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isPc ? (
        <TableRow key={cartItem.productId}>
          <CartTableCell>{index}</CartTableCell>
          <CartTableCell>
            <Checkbox checked={cartItem.checked} onChange={handleCheck} />
          </CartTableCell>
          <CartTableCell>
            <img
              src={cartItem.image}
              alt={cartItem.name}
              style={{ width: 100 }}
            />
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
      ) : (
        <MobileItems sx={{ margin: 2, border: 1 }}>
          <Box style={{ position: "absolute", alignItems: "left" }}>
            <Checkbox checked={cartItem.checked} onChange={handleCheck} />
          </Box>
          <img
            src={cartItem.image}
            alt={cartItem.name}
            style={{ width: 100, marginTop: 10 }}
          />
          <p>{cartItem.name}</p>
          <p>{cartItem.price}</p>
          <Button onClick={handleMinus} disabled={cartItem.quantity <= 1}>
            -
          </Button>
          {cartItem.quantity}
          <Button onClick={handlePlus}>+</Button>
          <Button onClick={handleRemove}>삭제하기</Button>
        </MobileItems>
      )}
    </>
  );
}

const MobileItems = styled.div`
  box-shadow: black 0px 0px 0px 1px, #dddfdf 5px 5px 0px 0px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
`;

export default CartItemCard;
