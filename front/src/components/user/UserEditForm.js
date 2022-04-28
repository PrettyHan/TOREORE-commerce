import React from "react";
import styled from "styled-components";

function UserEditForm() {
    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            <Container>
                <p>회원정보 수정</p>
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

export default UserEditForm;
