import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";

function LikedCard({ liked }) {
    const navigate = useNavigate();
    console.log(liked.image);

    function sendProduct() {
        navigate(`/products/${liked.category}/${liked.productId}`);
    }
    //const columns = ["상품번호", "상품사진", "상품명", "가격"];

    return (
        <Container container spacing={{ lg: 1, md: 2, sm: 1, xs: 1 }}>
            <Items item lg={3} md={6} sm={12} xs={12}>
                {liked.productId}
            </Items>
            <Items2 item lg={3} md={6} sm={12} xs={12}>
                <Image image={String(liked.image)}></Image>
            </Items2>
            <ItemsClick
                item
                lg={3}
                md={6}
                sm={12}
                xs={12}
                onClick={sendProduct}
            >
                <Tooltip title="클릭 시, 상품페이지로 갑니다." arrow>
                    <span>{liked.name}</span>
                </Tooltip>
            </ItemsClick>
            <Items item lg={3} md={6} sm={12} xs={12}>
                {liked.price}원
            </Items>
        </Container>
    );
}

const Container = styled(Grid)`
    width: 95%;
    margin-bottom: 20px;
    height: auto;
    border: 1px solid #5e5b52;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Items = styled(Grid)`
    width: 20%;
    height: 30px;
    text-align: center;
    line-height: 15px;
`;

const Items2 = styled(Grid)`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ItemsClick = styled(Grid)`
    width: 20%;
    cursor: pointer;
    text-align: center;
`;

const Image = styled(Grid)`
    width: 130px;
    height: 130px;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center center;
    margin-bottom: 10px;
`;

export default LikedCard;
