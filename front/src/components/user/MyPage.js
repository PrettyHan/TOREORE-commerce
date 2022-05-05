import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import OrderHistory from "./myPageComponents/OrderHistory";
import LikedHistory from "./myPageComponents/LikedHistory";
import Coupon from "./myPageComponents/Coupon";
import Points from "./myPageComponents/Points";
import { UserStateContext } from "../../App";

import { Box, Button } from "@mui/material";
import styled from "styled-components";

function MyPage() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const user = userState.user;

    const constantsFirstState = {
        orderHistory: false,
        likedHistory: false,
        coupon: false,
        points: false,
    };
    const [isOpen, setIsOpen] = useState(constantsFirstState);

    const components = {
        orderHistory: <OrderHistory />,
        likedHistory: <LikedHistory />,
        coupon: <Coupon />,
        points: <Points />,
    };

    function whatIsOpen() {
        for (const [key, value] of Object.entries(isOpen)) {
            if (value === true) {
                return components[key];
            }
        }
        return <div></div>;
    }

    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            {user ? (
                <Container>
                    <UserContainer>
                        {user.loginType === "BASIC" ||
                        user.hasAddtionalInfo === true ? (
                            <Intro>
                                <p> "{user.name}" 님 안녕하세요!</p>
                                {user.loginType === "BASIC" && (
                                    <p>
                                        {" "}
                                        ID ▶ {user.userId}{" "}
                                        {user.gender === 0 ? "🙋🏻‍♀️" : "🙋🏻‍♂️"}{" "}
                                    </p>
                                )}
                            </Intro>
                        ) : (
                            <Intro>
                                <p> 고객님 안녕하세요!</p>
                                {user?.hasAddtionalInfo ? (
                                    <></>
                                ) : (
                                    <p> 추가 정보를 입력해주세요.</p>
                                )}
                            </Intro>
                        )}
                        <div>
                            <Button
                                onClick={() => navigate("/useredit")}
                                disableElevation
                                disableRipple
                            >
                                {user.loginType === "BASIC" ||
                                user.hasAddtionalInfo === true
                                    ? "회원 정보 수정"
                                    : "추가 정보 입력"}
                            </Button>
                        </div>
                    </UserContainer>
                    <ItemsContainer>
                        <Items
                            onClick={() =>
                                setIsOpen({
                                    ...constantsFirstState,
                                    orderHistory: true,
                                })
                            }
                        >
                            주문 내역
                        </Items>
                        <Items
                            onClick={() =>
                                setIsOpen({
                                    ...constantsFirstState,
                                    likedHistory: true,
                                })
                            }
                        >
                            좋아요
                        </Items>
                        <Items
                            onClick={() =>
                                setIsOpen({
                                    ...constantsFirstState,
                                    coupon: true,
                                })
                            }
                        >
                            쿠폰
                        </Items>
                        <Items
                            onClick={() =>
                                setIsOpen({
                                    ...constantsFirstState,
                                    points: true,
                                })
                            }
                        >
                            적립금
                        </Items>
                    </ItemsContainer>
                    {whatIsOpen()}
                </Container>
            ) : (
                <Container>
                    <Items onClick={() => navigate("/")}>
                        로그인 유저만 사용가능합니다 ^^
                    </Items>
                </Container>
            )}
        </div>
    );
}

const Container = styled.div`
    margin: 30px 0 100px 0;
    display: grid;
    row-gap: 20px;
    place-items: center center;
`;

const UserContainer = styled(Box)`
    width: 62%;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
`;

const Intro = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const ItemsContainer = styled(Box)`
    width: 63.5%;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-weight: bold;
`;

const Items = styled.div`
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    width: 24%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    cursor: pointer;
`;

export default MyPage;
