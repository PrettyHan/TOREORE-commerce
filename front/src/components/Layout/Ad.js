import React from "react";
import styled from "styled-components";

function Ad() {
    return (
        <>
            <AdBox1>
                <img src="https://cdn.pixabay.com/photo/2015/08/25/11/50/shop-906722_960_720.jpg" />
                <AdP1>TOREOLRE 합정점 GRAND OPEN !!!</AdP1>
            </AdBox1>
            <AdBox2>
                <img src="https://cdn.pixabay.com/photo/2015/11/28/11/26/sale-1067126__340.jpg" />
                <AdP2>지금까지 이런 SALE은 없었다!</AdP2>
                <AdP2>BIG SALE COMING SOON</AdP2>
            </AdBox2>
        </>
    );
}

const AdBox1 = styled.div`
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

const AdBox2 = styled.div`
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

const AdP1 = styled.p`
    font-size: 45px;
    font-weight: bold;
    color: #d0c4df;
    font-style: italic;
    text-shadow: -1px 0 #dddfdf, 0 1px gray, 2px 0 gray, 0 -1px #dddfdf;
`;

const AdP2 = styled.span`
    font-size: 45px;
    font-weight: bold;
    color: red;
    font-style: italic;
`;

export default Ad;
