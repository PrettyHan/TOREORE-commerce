import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Tab } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";

import styled from "styled-components";

import { UserStateContext, DispatchContext } from "../../App";

function Header({ handleOpen }) {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    // 전역상태 user가 null이 아닌 경우 로그인 성공 상태!
    const isLogin = !!userState.user;

    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    });

    // 로그아웃 함수
    const logout = () => {
        // sessionStorage에 저장했던 JWT 토큰 삭제
        sessionStorage.removeItem("userToken");
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: "LOGOUT" });
        // 메인 화면으로 돌아감. ( 로그인 화면으로 돌아갈지는 생각 )
        navigate("/");
    };

    return (
        <Container sx={{ flexGrow: 1, boxShadow: 0, mb: 3 }}>
            {scrollPosition < 110 ? (
                <HeaderVar
                    position="static"
                    sx={{
                        boxShadow: 0,
                        bgcolor: "transparent",
                        color: "#000",
                    }}
                >
                    <Toolbar>
                        <Grid
                            container
                            spacing={{ lg: 6, md: 2, sm: 1, xs: 1 }}
                        >
                            <Wrapper item lg={2} md={1} sm={12} xs={12}>
                                <Tab
                                    icon={<HelpOutlineOutlinedIcon />}
                                    onClick={() => navigate("/introduce")}
                                    style={{
                                        paddingRight: 0,
                                        minWidth: "50px",
                                    }}
                                    disableElevation
                                    disableRipple
                                />
                                <Details>About TOREOLRE</Details>
                            </Wrapper>
                            <Grid item lg={8} md={9} sm={12} xs={12}>
                                <SubTitle>또래와 함께 하는 쇼핑 ,</SubTitle>
                                <MainTitle onClick={() => navigate("/")}>
                                    TOREOLRE
                                </MainTitle>
                            </Grid>
                            <Wrapper item lg={2} md={1} sm={8.7} xs={9.5}>
                                <Box sx={{ flexGrow: 1 }} />
                                <Box
                                    sx={{ display: { xs: "flex", md: "flex" } }}
                                >
                                    <Tooltip
                                        title={isLogin ? "Logout" : "Login"}
                                        arrow
                                    >
                                        <NavIcon
                                            icon={
                                                isLogin ? (
                                                    <LogoutIcon />
                                                ) : (
                                                    <LoginIcon />
                                                )
                                            }
                                            onClick={
                                                isLogin ? logout : handleOpen
                                            }
                                            disableElevation
                                            disableRipple
                                        />
                                    </Tooltip>
                                    <Tooltip title="Cart" arrow>
                                        <NavIcon
                                            icon={<ShoppingCartOutlinedIcon />}
                                            onClick={() => navigate("/cart")}
                                            disableElevation
                                            disableRipple
                                        />
                                    </Tooltip>
                                    <Tooltip title="MyPage" arrow>
                                        <NavIcon
                                            icon={<PersonOutlinedIcon />}
                                            onClick={() => navigate("/myPage")}
                                            disableElevation
                                            disableRipple
                                        />
                                    </Tooltip>
                                </Box>
                            </Wrapper>
                        </Grid>
                    </Toolbar>
                </HeaderVar>
            ) : (
                <></>
            )}
        </Container>
    );
}
export default Header;

const Container = styled(Box)`
    padding-top: 20px;
    display: flex;
    justify-content: center;
`;

const HeaderVar = styled(AppBar)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
`;

const NavIcon = styled(Tab)`
    cursor: pointer;
    width: 13%;
    height: auto;
    text-align: center;
`;

const Details = styled.p`
    font-size: 12px;
    padding-left: 1px;
`;

const MainTitle = styled.div`
    cursor: pointer;
    color: #5e5b52;
    font-size: 80px;
    text-align: center;
`;

const SubTitle = styled.div`
    text-align: center;
`;

const Wrapper = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
