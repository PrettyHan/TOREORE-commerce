import React from "react";
import styled from "styled-components";

// 준비 중인 서비스 입니다.
function Coupon() {
    return (
        <Container>
            <Title>쿠폰 내역</Title>
            <ListContainer>
                <Columns>
                    신규 회원! 첫 주문 배송비 무료 쿠폰 [ 2만원 이상 적용 ]
                </Columns>
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
    justify-content: center;
    align-items: center;
`;
export default Coupon;
