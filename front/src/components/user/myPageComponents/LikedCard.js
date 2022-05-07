import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

function LikedCard({ liked }) {
    const navigate = useNavigate();
    console.log(liked.image);

    function sendProduct() {
        navigate(`/products/${liked.category}/${liked.productId}`);
    }
    //const columns = ["상품번호", "상품사진", "상품명", "가격"];

    return (
        <Container>
            <Items>{liked.productId}</Items>
            <Image image={String(liked.image)}></Image>
            <ItemsClick onClick={sendProduct}>
                <Tooltip title="클릭 시, 상품페이지로 갑니다." arrow>
                    <span>{liked.name}</span>
                </Tooltip>
            </ItemsClick>
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
    height: 10px;
    text-align: center;
    line-height: 160px;
`;

const ItemsClick = styled.div`
    width: 20%;
    height: 160px;
    text-align: center;
    line-height: 160px;
    cursor: pointer;
`;

const Image = styled.div`
    width: 160px;
    height: 160px;
    background-image: url(${(props) => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;

export default LikedCard;
