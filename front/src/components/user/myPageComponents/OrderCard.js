import React from "react";
import styled from "styled-components";

// const orderList = {
//   [];
// };

function OrderCard({ order }) {
  return (
    <Container>
      <Items>{order.orderNo}</Items>
      <Items>{order.orderProduct.map((product) => product + ", ")}</Items>
      <Items>{order.orderPrice}원</Items>
      <Items>{order.orderStatus === "done" ? "주문완료" : "진행 중"}</Items>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  margin-bottom: 20px;
  border: 1px solid #5e5b52;
  flex-wrap: wrap;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Items = styled.div`
  width: 20%;
  height: 80px;
  text-align: center;
  line-height: 80px;
`;

export default OrderCard;
