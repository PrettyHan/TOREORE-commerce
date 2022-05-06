import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LikedCard from "./LikedCard";
import Grid from "@mui/material/Grid";

import * as Api from "../../../api";

const columns = ["상품번호", "상품사진", "상품명", "가격"];

function LikedHistory() {
    const [likedList, setLikedList] = useState([]);
    const [isLiked, setIsLiked] = useState(false); // 좋아요 내역이 없을 경우 없다고 표기하기 위해 사용 하는 state

    const fetchLikedList = async () => {
        try {
            const res = await Api.get("liked");

            if (res.data) {
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
            <Wrapper>
                <Title>좋아요</Title>
                <ListContainer>
                    <Columns container spacing={{ lg: 1, md: 2, sm: 1, xs: 1 }}>
                        {columns.map((column, idx) => (
                            <Items
                                item
                                lg={3}
                                md={6}
                                sm={12}
                                xs={12}
                                key={`item-${idx}`}
                            >
                                {column}
                            </Items>
                        ))}
                    </Columns>
                    {isLiked ? (
                        likedList.map((liked, idx) => (
                            <LikedCard key={`liked-${idx}`} liked={liked} />
                        ))
                    ) : (
                        <NoLiked>"좋아요 내역이 없습니다."</NoLiked>
                    )}
                </ListContainer>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    padding: 5px 0 0 0;
    row-gap: 20px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 90%;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 0 20px;
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

const Columns = styled(Grid)`
    width: 95%;
    margin-bottom: 10px;
    border: 1px solid #5e5b52;
    flex-wrap: wrap;
    flex-grow: 1;
`;

const Items = styled(Grid)`
    width: 20%;
    height: 40px;
    text-align: center;
    line-height: 17px;
    font-weight: bold;
`;

const NoLiked = styled.div`
    margin: 20px 0 30px 0;
    font-weight: bold;
    font-size: 15px;
    color: #5e5b52;
`;

export default LikedHistory;
