import React from "react";
import styled from "styled-components";

function LikedCard({ liked }) {
  return (
    <Container>
      <Items>{liked.productId}</Items>
      <Items>{liked.image}</Items>
      <Items>{liked.productName}</Items>
      <Items>{liked.price}원</Items>
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

export default LikedCard;
