import React, { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../App";
import styled from "styled-components";

// 임시데이터 생성

const ageBest = {
    20: [
        "https://cdn.pixabay.com/photo/2016/11/21/14/30/man-1845715__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/11/29/close-up-1844786__340.jpg",
        "https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328__340.jpg",
        "https://cdn.pixabay.com/photo/2020/06/05/15/21/yellow-5263498__340.jpg",
        "https://cdn.pixabay.com/photo/2016/07/04/04/32/sock-1495920__340.jpg",
    ],
    30: ["슬랙스", "뾰족 구두", "클러치", "d", "t"],
    40: ["고무줄 바지", "넥타이", "원피스", "t", "o"],
    50: ["등산화", "보온 니트", "중절모", "p", "k"],
    60: ["편한 티셔츠", "고무줄 치마", "푹신한 운동화", "u"],
};

function Recommend() {
    const userState = useContext(UserStateContext);
    const [isLogin, setIsLogin] = useState(false);

    // 현재 년도
    const currentYear = new Date().getFullYear();

    //연령대를 구한다
    const getAge = () => {
        const birth = userState.user.birth;
        const userAge = Math.floor((currentYear - birth.slice(0, 4)) / 10) * 10;

        return userAge;
    };

    const matchItems = () => {
        const userAge = getAge();

        if (userAge < 20) {
            return ageBest[20];
        } else if (userAge > 60) {
            return ageBest[60];
        } else {
            return ageBest[userAge];
        }
    };

    const randomChoice = (targetList) => {
        const newList = [];

        while (true) {
            if (newList.length === 3) {
                break;
            }
            const randomNum = Math.floor(Math.random() * targetList.length);
            if (newList.includes(targetList[randomNum])) {
            } else {
                newList.push(targetList[randomNum]);
            }
        }
        return newList;
    };

    useEffect(() => {
        setIsLogin(userState.user.birth);
    }, [userState]);

    return (
        <Wrapper>
            <RecommendP> My TORE Love It!</RecommendP>
            {isLogin && (
                <>
                    <Container>
                        {randomChoice(matchItems()).map((item, idx) => (
                            <Items key={`item-${idx}`} imgUrl={item} />
                        ))}
                    </Container>
                    <ShowingP>
                        {getAge()}대인 '{userState.user.name}' 고객님께
                        추천합니다
                    </ShowingP>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 20px 0 20px;
    margin: 0 0 80px 0;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 15px 15px 0px 0px;
`;

const RecommendP = styled.span`
    text-align: left;
    font-size: 45px;
    font-style: italic;
    color: #d0c4df;
    text-shadow: -1px 0 #5e5b52, 0 1px #5e5b52, 1px 0 #5e5b52, 0 -1px #5e5b52;
`;

const Container = styled.div`
    width: 100%;
    height: 350px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const Items = styled.div`
    width: 30%;
    border-radius: 100%;
    height: 340px;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    border: 1px solid #5e5b52;
    cursor: pointer;
`;

const ShowingP = styled.span`
    margin: 0 0 10px 10px;
    text-align: right;
    font-size: 35px;
    color: #d0c4df;
    text-shadow: -1px 0 #5e5b52, 0 1px #5e5b52, 1px 0 #5e5b52, 0 -1px #5e5b52;
`;

// width: 20%;
// height: 25px;
// text-align: center;
// line-height: 25px;
// font-weight: bold;
export default Recommend;
