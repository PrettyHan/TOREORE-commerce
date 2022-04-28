import React from "react";
import styled from "styled-components";

function UserEditForm() {
    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            <Container>
                <Title>회원 정보 수정</Title>
                <ListContainer>
                    <div>회원 정보 수정</div>
                </ListContainer>
            </Container>
        </div>
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

const NoOrder = styled.div`
    margin: 20px 0 30px 0;
    font-weight: bold;
    font-size: 13px;
    color: #5e5b52;
`;

export default UserEditForm;
