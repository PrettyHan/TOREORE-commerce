import React, { useState, useContext } from "react";

import OrderHistory from "./myPageComponents/OrderHistory";
import LikedHistory from "./myPageComponents/LikedHistory";
import Coupon from "./myPageComponents/Coupon";
import Points from "./myPageComponents/Points";
import UserEditForm from "./UserEditForm";

import { Box, Button } from "@mui/material";
import styled from "styled-components";

import { UserStateContext } from "../../App";

function MyPage() {
    const userState = useContext(UserStateContext);
    const user = userState.user;

    const constantsFirstState = {
        userEditForm: false,
        orderHistory: false,
        likedHistory: false,
        coupon: false,
        points: false,
    };
    const [isOpen, setIsOpen] = useState(constantsFirstState);

    const components = {
        userEditForm: <UserEditForm />,
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
            <Container>
                <UserContainer>
                    <div>
                        <p> "{user.name}" 님 안녕하세요!</p>
                        <p>
                            {" "}
                            ID ▶ {user.userId} {user.gender === 0 ? "🙋🏻‍♀️" : "🙋🏻‍♂️"}{" "}
                        </p>
                    </div>
                    <div>
                        <Button
                            onClick={() =>
                                setIsOpen({
                                    ...constantsFirstState,
                                    userEditForm: true,
                                })
                            }
                            disableElevation
                            disableRipple
                        >
                            회원 정보 수정
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
                            setIsOpen({ ...constantsFirstState, coupon: true })
                        }
                    >
                        쿠폰
                    </Items>
                    <Items
                        onClick={() =>
                            setIsOpen({ ...constantsFirstState, points: true })
                        }
                    >
                        적립금
                    </Items>
                </ItemsContainer>
                {whatIsOpen()}
            </Container>
        </div>
    );
}

const Container = styled.div`
    margin-top: 100px;
    display: grid;
    row-gap: 20px;
    place-items: center center;
`;

const UserContainer = styled(Box)`
    width: 61%;
    box-shadow: #5e5b52 0px 0px 0px 1px, #eefc57 5px 5px 0px 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
`;

const ItemsContainer = styled(Box)`
    width: 63.5%;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`;

const Items = styled.div`
    box-shadow: #5e5b52 0px 0px 0px 1px, #eefc57 5px 5px 0px 0px;
    width: 24%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    cursor: pointer;
`;
// ${(props) => (props.cursor === "pointer" ? "pointer" : "default")}

export default MyPage;
