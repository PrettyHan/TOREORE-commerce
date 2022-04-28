import React from "react";
import styled from "styled-components";
import LikedCard from "./LikedCard";

const likedList = [
    {
        productId: "12345678",
        image: "https://",
        productName: "럭셔리 치마",
        price: "14500",
    },
    {
        productId: "25836914",
        image: "https://",
        productName: "촌스러운 양말",
        price: "2500",
    },
    {
        productId: "11111111",
        image: "https://",
        productName: "패턴화려한 넥타이",
        price: "7500",
    },
];

function LikedHistory() {
    return (
        <Container>
            <Title>좋아요</Title>
            <ListContainer>
                <Columns>
                    {Object.keys(likedList[0]).map((column) => (
                        <Items>{column}</Items>
                    ))}
                </Columns>
                {likedList.map((liked) => (
                    <LikedCard
                        key={likedList.indexOf(liked, 0)}
                        liked={liked}
                    />
                ))}
            </ListContainer>
        </Container>
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

export default LikedHistory;
