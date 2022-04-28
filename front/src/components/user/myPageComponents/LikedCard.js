import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LikedCard({ liked }) {
    const navigate = useNavigate();

    function sendProduct() {
        navigate(`/products?cid=${liked.category}&pid=${liked.productId}`);
    }
    //const columns = ["상품번호", "상품사진", "상품명", "가격"];

    return (
        <Container>
            <Items>{liked.productId}</Items>
            <Items>{liked.image}</Items>
            <ItemsClick onClick={sendProduct}>{liked.name}</ItemsClick>
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

const ItemsClick = styled.div`
    width: 20%;
    height: 80px;
    text-align: center;
    line-height: 80px;
`;

export default LikedCard;
