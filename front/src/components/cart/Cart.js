import React, { useState, useEffect } from "react";
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
import CartItemCard from "./CartItemCard";
import CartTableCell from "./CartTableCell";

import * as Api from "../../api";

function Cart() {
  const navigate = useNavigate();

  // 목업 데이터
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

  // 카트아이템들 상태 설정
  const [cartItems, setCartItems] = useState(fakeData);
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
      // const deleteProducts = checkedCartItems.map((item) => {
      //   return item.productId
      // })
      // await Api.del("carts/select", {
      //   productIdArr: deleteProducts
      // });

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
      const orderProduts = checkedCartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      const res = await Api.post("orders", orderProduts);
      const orderId = res.data.orderId;
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 열릴 때 카트 아이템들을 받아오는 함수
  const fetchCartItems = async () => {
    try {
      // const res = await Api.get("carts");
      // setCartItems(handleCartData(res.data));
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
        <Box>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            장바구니
          </Typography>
        </Box>
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
        <Box>
          <Typography>총 결제 금액: {carculateTotal}원</Typography>
        </Box>
        <Box>
          <Button
            disabled={isCartEmpty || !isCheckedAll(cartItems)}
            onClick={handleSelectRemove}
          >
            선택삭제
          </Button>
          <Button
            disabled={isCartEmpty || !isCheckedAll(cartItems)}
            onClick={handleOrder}
          >
            주문하기
          </Button>
          <Button onClick={() => navigate(-1)}>쇼핑 계속하기</Button>
        </Box>
      </div>
    </>
  );
}

export default Cart;
