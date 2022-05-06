import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

function Ad() {
    return (
        <>
            <AdBox1 container spacing={{ lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Items item xs={12} sm={12} md={12} lg={12}>
                    <AdP1>TOREOLRE 합정점 GRAND OPEN !!!</AdP1>
                    <AdP1>5월 7일</AdP1>
                </Items>
            </AdBox1>

            <AdBox2 container spacing={{ lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Items2 item xs={12} sm={12} md={12} lg={12} />
                <AdP2>지금까지 이런 SALE은 없었다!</AdP2>
                <AdP2>BIG SALE COMING SOON!!</AdP2>
            </AdBox2>
        </>
    );
}

const Items = styled(Grid)`
    width: 100%;
    height: 90%;
    background-image: url(https://cdn.pixabay.com/photo/2015/08/25/11/50/shop-906722_960_720.jpg);
    background-size: cover;
    background-position: center center;
    border: 1px solid #5e5b52;
`;

const AdBox1 = styled(Grid)`
    width: 100%;
    height: 650px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 20px 0 20px;
    margin: 50px 0 80px 0;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 15px 15px 0px 0px;
`;

const Items2 = styled(Grid)`
    width: auto;
    height: 30%;
    background-image: url(https://cdn.pixabay.com/photo/2015/11/28/11/26/sale-1067126__340.jpg);
    background-size: cover;
    background-position: center center;
`;
const AdBox2 = styled(Grid)`
    width: 100%;
    height: 650px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px 0 20px;
    margin: 50px 0 150px 0;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 15px 15px 0px 0px;
`;

const AdP1 = styled(Grid)`
    font-size: 45px;
    font-weight: bold;
    color: red;
    font-style: italic;
    text-shadow: -1px 0 white, 0 1px gray, 2px 0 gray, 0 -1px white;
    text-align: center;
`;

const AdP2 = styled.span`
    font-size: 45px;
    font-weight: bold;
    color: red;
    font-style: italic;
    text-align: center;
`;

export default Ad;
