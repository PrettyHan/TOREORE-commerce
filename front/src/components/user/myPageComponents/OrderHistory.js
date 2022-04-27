import React from "react";
import styled from "styled-components";
import OrderCard from "./OrderCard";

const orderList = [
  {
    orderNo: 1,
    orderId: 56890014564,
    orderProduct: ["jaket", "pinkpants", "redsocks"],
    orderPrice: "15,000",
    orderStatus: "done",
  },
  {
    orderNo: 2,
    orderId: 56890014544,
    orderProduct: ["blouse", "trouser", "muffler"],
    orderPrice: "37,000",
    orderStatus: "doing",
  },
  {
    orderNo: 3,
    orderId: 56890014532,
    orderProduct: ["skirt", "sunglass"],
    orderPrice: "165,000",
    orderStatus: "doing",
  },
];

function OrderHistory() {
  return (
    <Container>
      <Title>주문 내역</Title>
      <ListContainer>
        <Columns>
          {Object.keys(orderList[0]).map((column) => (
            <Items>{column}</Items>
          ))}
        </Columns>
        {orderList.map((order) => (
          <OrderCard key={order.orderNo} order={order} />
        ))}
      </ListContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 63.5%;
  padding: 5px 0 0 0;
  box-shadow: #5e5b52 0px 0px 0px 1px, #eefc57 5px 5px 0px 0px;
  flex-wrap: wrap;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-align: left;
  font-size: 20px;
  margin: 0 0 23px 23px;
`;

const ListContainer = styled.div`
  padding: 5px 0 0 0;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Columns = styled.div`
  width: 95%;
  margin-bottom: 10px;
  border: 1px solid #5e5b52;
  flex-wrap: wrap;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Items = styled.div`
  width: 20%;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-weight: bold;
`;

export default OrderHistory;
