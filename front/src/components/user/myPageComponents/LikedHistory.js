import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LikedCard from "./LikedCard";

import * as Api from "../../../api";

// const likedList = [
//     {
//         productId: "12345678",
//         image: "https://",
//         productName: "럭셔리 치마",
//         price: "14500",
//     },
//     {
//         productId: "25836914",
//         image: "https://",
//         productName: "촌스러운 양말",
//         price: "2500",
//     },
//     {
//         productId: "11111111",
//         image: "https://",
//         productName: "패턴화려한 넥타이",
//         price: "7500",
//     },
// ];

const columns = ["상품번호", "상품사진", "상품명", "가격"];

function LikedHistory() {
    const [likedList, setLikedList] = useState([]);
    const [isLiked, setIsLiked] = useState(false); // 좋아요 내역이 없을 경우 없다고 표기하기 위해 사용 하는 state

    const fetchLikedList = async () => {
        try {
            const res = await Api.get("liked");
            if (res.date) {
                setIsLiked(true);
                setLikedList(res.data);
            } else {
                console.log("빈내역 입니다");
                setIsLiked(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLikedList();
    }, []);

    return (
        <Container>
            <Title>좋아요</Title>
            <ListContainer>
                <Columns>
                    {columns.map((column) => (
                        <Items>{column}</Items>
                    ))}
                </Columns>
                {isLiked ? (
                    likedList.map((liked) => (
                        <LikedCard
                            key={likedList.indexOf(liked, 0)}
                            liked={liked}
                        />
                    ))
                ) : (
                    <NoLiked>"좋아요 내역이 없습니다."</NoLiked>
                )}
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
    font-size: 17px;
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

const NoLiked = styled.div`
    margin: 20px 0 30px 0;
    font-weight: bold;
    font-size: 15px;
    color: #5e5b52;
`;

export default LikedHistory;
