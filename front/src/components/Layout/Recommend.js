import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
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
                    <Grid container spacing={{ lg: 1, md: 5, sm: 3, xs: 2 }}>
                        {recommendList.map((item, idx) => (
                            <Grid
                                key={`item-${idx}`}
                                item
                                xs={5.5}
                                sm={3.8}
                                md={2.3}
                                lg={2.4}
                            >
                                <Items
                                    key={`item-${idx}`}
                                    imgUrl={item.image}
                                    onClick={() => sendProduct(item)}
                                />
                            </Grid>
                        ))}
                    </Grid>
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
    justify-content: space-between;
    padding: 0 20px 0 20px;
    margin: 0 0 80px 0;
    opacity: 0.8;
    border: 1px solid #ebebeb;
    margin-bottom: 100px;
`;

const RecommendP = styled.span`
    text-align: left;
    font-size: 50px;
    color: #3d1b54;
    padding: 30px 0 0 30px;
    font-weight: 700;
`;

const Items = styled.div`
    width: auto;
    border-radius: 19%;
    height: 230px;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
`;

const ShowingP = styled.span`
    padding: 0 10px 10px 10px;
    margin: 0 0 10px 10px;
    text-align: right;
    font-size: 28px;
    font-weight: bold;
    color: #3d1b54;
    font-family: "Nanum Gothic", sans-serif;
`;

export default Recommend;
