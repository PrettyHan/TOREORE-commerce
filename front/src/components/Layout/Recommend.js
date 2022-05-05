import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import * as Api from "../../api";

function Recommend() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const [isLogin, setIsLogin] = useState(false);
    const [recommendList, setRecommendList] = useState([]);

    // 현재 년도
    const currentYear = new Date().getFullYear();

    //연령대를 구한다
    const getAge = () => {
        const birth = userState.user.birth;
        const userAge = Math.floor((currentYear - birth.slice(0, 4)) / 10) * 10;
        if (userAge < 10 || userAge > 100) {
            return "";
        } else {
            return `${userAge}대`;
        }
    };

    // localhost:5001/products/personal-recommendation
    //
    const randomChoice = (targetList) => {
        const newList = [];
        while (true) {
            if (newList.length === 5) {
                break;
            }
            const randomNum = Math.floor(Math.random() * 15);
            if (newList.includes(targetList[randomNum])) {
            } else {
                newList.push(targetList[randomNum]);
            }
        }
        setRecommendList(newList);
    };
    //products/:category/:productId
    //추천 상품 클릭 시, 상품디테일 페이지로 이동
    const sendProduct = (item) => {
        navigate(`products/${item.category}/${item.productId}`);
    };
    // login 유무를 확인하며, 그 유저의 성별과 연령을 토대로 제품을 랜덤으로 추천해준다.
    useEffect(() => {
        setIsLogin(userState.user.birth);
        Api.get("products/personal-recomandation").then((res) => {
            randomChoice(res.data);
        });
    }, [userState.user]);

    return (
        <Wrapper>
            <RecommendP> My TORE Love It!</RecommendP>
            {isLogin && (
                <>
                    <Container>
                        {recommendList.map((item, idx) => (
                            <Items
                                key={`item-${idx}`}
                                imgUrl={item.image}
                                onClick={() => sendProduct(item)}
                            />
                        ))}
                    </Container>
                    <ShowingP>
                        {getAge()} '{userState.user.name}' 고객님 또래가
                        좋아합니다
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
    font-size: 55px;
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
    width: 19%;
    border-radius: 19%;
    height: 300px;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    background-position: center center;
    border: 1px solid #5e5b52;
    cursor: pointer;
`;

const ShowingP = styled.span`
    margin: 0 0 10px 10px;
    text-align: right;
    font-size: 38px;
    color: #d0c4df;
    text-shadow: -1px 0 #5e5b52, 0 1px #5e5b52, 1px 0 #5e5b52, 0 -1px #5e5b52;
`;

export default Recommend;
