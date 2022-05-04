import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import { Container } from "@mui/material";
import Ad from "./Ad";
import Recommend from "./Recommend";
import Search from "./Search";

const Main = () => {
    const userState = useContext(UserStateContext);
    const isLogin = !!userState.user; // 로그인 여부 판단
    const loginType = userState.user.loginType; // 일반회원 or 소셜회원
    const addInfo = userState.user.hasAddtionalInfo; // 소셜회원이면 추가 정보를 받았는지

    return (
        <Container style={{ minHeight: "calc(100vh - 180px)" }}>
            {isLogin && !loginType ? (
                <Recommend />
            ) : addInfo ? (
                <Recommend />
            ) : (
                <></>
            )}
            <Ad />
        </Container>
    );
};

export default Main;
