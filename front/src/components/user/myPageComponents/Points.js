import React from "react";
import styled from "styled-components";

// const orderList = {
//   [];
// };

function Points() {
    return (
        <Container>
            <Title>적립금 내역</Title>
            <ListContainer>
                <Columns>
                    Welcome! 가입 적립금 2,000원 [ 2만원 이상 적용 ]
                </Columns>
            </ListContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 63.5%;
    padding: 5px 0 0 0;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
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

export default Points;
