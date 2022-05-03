import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material/";
import styled from "styled-components";

import CartItemCard from "./CartItemCard";
import CartTableCell from "./CartTableCell";

import * as Api from "../../api";

import { UserStateContext } from "../../App";

function Cart() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const user = userState.user;
  const isLogin = !!userState.user; // 로그인 여부 판단

  // 카트아이템들 상태 설정
  const [cartItems, setCartItems] = useState([]);
  // 카트아이템카드 컴포넌트 맵핑
  const cartItemList = cartItems.map((cartItem, index) => (
    <CartItemCard
      cartItem={cartItem}
      setCartItems={setCartItems}
      index={index + 1}
    />
  ));

  // 체크된 카트 아이템들
  const checkedCartItems = cartItems.filter(
    (cartItem) => cartItem.checked === true
  );
  // 체크된 카트 아이템들 주문가격 합산, 이후 쿠폰이나 적립금 추가 시 수정
  const carculateTotal = checkedCartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  // 카트가 비었는지 체크
  const isCartEmpty = Array.isArray(cartItems) && cartItems.length === 0;
  // 카트가 모두 체크되었는지 확인하는 함수
  const isCheckedAll = (cartItems) => {
    if (cartItems.some((cartItem) => cartItem.checked === false)) {
      return false;
    } else {
      return true;
    }
  };

  // 처음에 받아올 카트 아이템들 체크 추가해 주는 함수
  const handleCartData = (cartItems) => {
    return cartItems.map((item) => {
      return {
        ...item,
        checked: true,
      };
    });
  };

  // 전체 선택 체크박스 핸들링 함수
  const handleCheck = (event) => {
    setCartItems((current) => {
      return current.map((item) => {
        return {
          ...item,
          checked: event.target.checked,
        };
      });
    });
  };

  // 선택 삭제 버튼 클릭 핸들링 함수
  const handleSelectRemove = async () => {
    try {
      const productIdArr = checkedCartItems.map((item) => {
        return item.productId;
      });
      await Api.delete("carts/select", {
        productIdArr,
      });

      setCartItems((current) => {
        return current.filter((item) => item.checked === false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 주문하기 버튼 클릭 핸들링 함수
  const handleOrder = async () => {
    try {
      const body = {
        orderName: "test",
        zipcode: {},
        message: "",
        paymentMethod: "없음",
      };

      const res = await Api.post("orders", body);
      const orderId = res.data.orderId;
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 열릴 때 카트 아이템들을 받아오는 함수
  const fetchCartItems = async () => {
    try {
      const res = await Api.get("carts");
      const fetchedItems = res.data;
      setCartItems(handleCartData(fetchedItems));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <div style={{ minHeight: "calc(100vh - 180px)" }}>
        {isLogin ? (
          <Container>
            <Box>
              <Typography
                component="h2"
                variant="h6"
                color="inherit"
                gutterBottom
              >
                장바구니
              </Typography>
            </Box>
            <CartContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <CartTableCell>전체 {cartItems.length}개</CartTableCell>
                    <CartTableCell>
                      <Checkbox
                        checked={isCheckedAll(cartItems)}
                        onChange={handleCheck}
                      ></Checkbox>
                    </CartTableCell>
                    <CartTableCell>이미지</CartTableCell>
                    <CartTableCell>상품명</CartTableCell>
                    <CartTableCell>판매가</CartTableCell>
                    <CartTableCell>주문금액</CartTableCell>
                    <CartTableCell>수량</CartTableCell>
                    <CartTableCell>주문관리</CartTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isCartEmpty ? (
                    cartItemList
                  ) : (
                    <Typography>장바구니에 상품을 담지 않았습니다.</Typography>
                  )}
                </TableBody>
              </Table>
            </CartContainer>
            <Box>
              <Typography>총 결제 금액: {carculateTotal}원</Typography>
            </Box>
            <ItemsContainer>
              <Items>
                <Button
                  disabled={isCartEmpty || !isCheckedAll(cartItems)}
                  onClick={handleSelectRemove}
                >
                  선택삭제
                </Button>
              </Items>
              <Items>
                <Button
                  disabled={isCartEmpty || !isCheckedAll(cartItems)}
                  onClick={handleOrder}
                >
                  주문하기
                </Button>
              </Items>
              <Items>
                <Button onClick={() => navigate(-1)}>쇼핑 계속하기</Button>
              </Items>
            </ItemsContainer>
          </Container>
        ) : (
          <Container>
            <Items onClick={() => navigate("/")}>
              로그인 유저만 사용가능합니다 ^^
            </Items>
          </Container>
        )}
      </div>
    </>
  );
}

const Container = styled.div`
  margin: 30px 0 100px 0;
  display: grid;
  row-gap: 20px;
  place-items: center center;
`;

const CartContainer = styled(Box)`
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

export default Cart;
