import React from "react";
import styled from "styled-components";

// 준비 중인 서비스 입니다.
function Coupon() {
    return (
        <Container>
            <Wrapper>
                <Title>쿠폰 내역</Title>
                <ListContainer>
                    <Columns>
                        신규 회원! 첫 주문 배송비 무료 쿠폰 [ 2만원 이상 적용 ]
                    </Columns>
                </ListContainer>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    padding: 5px 0 0 0;
    row-gap: 20px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 90%;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 0 20px;
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
