import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import { Container } from "@mui/material";
import Ad from "./Ad";
import Recommend from "./Recommend";
import Grid from "@mui/material/Grid";

const Main = () => {
    const userState = useContext(UserStateContext);
    const user = userState.user;
    const isLogin = !!userState.user; // 로그인 여부 판단

    return (
        <Container style={{ minHeight: "calc(100vh - 180px)" }}>
            <Grid container spacing={{ lg: 1, md: 5, sm: 3, xs: 2 }}>
                {isLogin && user?.loginType === "BASIC" ? (
                    <Recommend />
                ) : (
                    user?.hasAddtionalInfo && <Recommend />
                )}
                <Ad />
            </Grid>
        </Container>
    );
};

export default Main;
