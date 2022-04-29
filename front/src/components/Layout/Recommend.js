import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import styled from "styled-components";

// 임시데이터 생성 

const ageBest = {
    20: ["볼캡 모자", "샤랄라 원피스", "리넨 셔츠", "A","c"],
    30 : ["슬랙스", "뾰족 구두", "클러치","d","t"],
    40 : ["고무줄 바지", "넥타이", "원피스","t","o"],
    50 : ["등산화", "보온 니트", "중절모","p","k"],
    60 : ["편한 티셔츠", "고무줄 치마", "푹신한 운동화","u"],
}

function Recommend () {
    const userState = useContext(UserStateContext);

    // 현재 년도 
    const currentYear = new Date().getFullYear();

    //연령대를 구한다 

    const matchItems = () => {
        const birth = userState.user.birth;
        const userAge = Math.floor((currentYear-birth.slice(0,4)) / 10) * 10;

        if (userAge < 20) {
            return ageBest[20];
        }
        else if (userAge > 60) {
            return ageBest[60];
        }    
        else {
            return ageBest[userAge];
        }
    }

    const randomChoice = (targetList) => {
        const newList = [];

        while (true) {
            if (newList.length === 3) {
                break
            }
            const landomNum = Math.floor(Math.random() * targetList.length)
            if (newList.includes(targetList[landomNum])) { 
            }
            else {
                newList.push(targetList[landomNum])
            }
        }
        return newList;

    }

    return (
        <>
        <RecommendP>20대 내 또래들이 고른 상품</RecommendP>
        <Container>
                {randomChoice(matchItems()).map((item, idx) => <Items key={`item-${idx}`}>{item}</Items>)}
        </Container>
        </>
    )

}

const Container = styled.div`
    width: 100%;
    height: 450px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 20px 0 20px;
    margin: 0 0 80px 0;
    border: 2px solid #5E5B52;
`

const RecommendP = styled.span`
    font-size: 30px;
    font-weight: bold;
    color: black;
`

const Items = styled.div`
    width: 20%;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-weight: bold;
`;
export default Recommend;