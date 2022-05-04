import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import { Container } from "@mui/material";
import Ad from "./Ad";
import Recommend from "./Recommend";
import Search from "./Search";

const Main = () => {
    const userState = useContext(UserStateContext);
    const isLogin = !!userState.user; // 로그인 여부 판단

    return (
        <Container style={{ minHeight: "calc(100vh - 180px)" }}>
            {/* {isLogin && <Recommend />} */}
            <Ad />
        </Container>
    );
};

export default Main;
