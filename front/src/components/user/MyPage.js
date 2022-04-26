import React from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

function MyPage() {
  return (
    <div style={{ minHeight: "calc(100vh - 180px)" }}>
      <Container>
        <UserContainer>
          <div>
            <p> 000님 안녕하세요!</p>
            <p> (user123, Green-Class)</p>
          </div>
          <div>
            <Button>회원 정보 수정</Button>
          </div>
        </UserContainer>
        <ItemsContainer>
          <Items cursor="pointer">주문 내역</Items>
          <Items cursor="pointer">좋아요</Items>
          <Items>쿠폰</Items>
          <Items>적립금</Items>
        </ItemsContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 200px;
  display: grid;
  row-gap: 20px;
  place-items: center center;
`;

const UserContainer = styled(Box)`
  width: 61%;
  box-shadow: #5e5b52 0px 0px 0px 1px, #eefc57 5px 5px 0px 0px;
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
  box-shadow: #5e5b52 0px 0px 0px 1px, #eefc57 5px 5px 0px 0px;
  width: 24%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  cursor: ${(props) => (props.cursor === "pointer" ? "pointer" : "default")};
`;

export default MyPage;
