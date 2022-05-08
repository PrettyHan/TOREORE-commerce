import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

const Ad = () => {
    return (
        <>
            <AdBox1 container spacing={{ lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Items item xs={12} sm={12} md={12} lg={12}>
                    <AdP1>MAY 7, OPEN</AdP1>
                </Items>
            </AdBox1>

            <AdBox2 container spacing={{ lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Items2 item xs={12} sm={12} md={12} lg={12}>
                    <AdP2>TIME SALE IS COMING</AdP2>
                </Items2>
            </AdBox2>
        </>
    );
};

const Items = styled(Grid)`
    width: 80%;
    height: 80%;
    background-image: url(https://images.unsplash.com/photo-1627225793904-a2f900a6e4cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80);
    background-position: center center;
    background-size: contain;
    line-height: 800px;
    opacity: 0.8;
`;

const AdBox1 = styled(Grid)`
    width: 80%;
    height: 650px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 50px 0 80px 0;
    padding: 0 50px 0 50px;
`;

const Items2 = styled(Grid)`
    width: 80%;
    height: 600px;
    background-image: url(https://images.unsplash.com/photo-1644424234553-2cd68a04bc96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5MHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60);
    background-position: center center;
    background-size: cover;
    text-align: center;
    line-height: 800px;
    opacity: 0.8;
`;

const AdBox2 = styled(Grid)`
    width: 80%;
    height: 650px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0 150px 0;
    padding: 0 50px 0 50px;
`;

const AdP1 = styled(Grid)`
    font-size: 50px;
    font-weight: bold;
    color: #f77737;
    text-align: center;
    word-break: break-all;
    white-space: nowrap;
`;

const AdP2 = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: #f77737;
    font-style: italic;
    word-break: normal;
    white-space: nowrap;
    word-wrap: break-word;
`;

export default Ad;
