import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Tab } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";

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
                <HeaderVar color="transparent" sx={{ boxShadow: 0 }}>
                    <Toolbar>
                        <Tab
                            icon={<HelpOutlineOutlinedIcon />}
                            onClick={() => navigate("/introduce")}
                            style={{ paddingRight: 0, minWidth: "50px" }}
                            disableElevation
                            disableRipple
                        />
                        <Details>About TOREOLRE</Details>
                        <Box sx={{ flexGrow: 1, padding: 0 }} />
                        <Wrap>
                            <Typography>또래와 함께 하는 쇼핑 ,</Typography>
                        </Wrap>
                        <MainTitle onClick={() => navigate("/")}>
                            TOREOLRE
                        </MainTitle>
                        <Box sx={{ flexGrow: 1, padding: 0 }} />
                        <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                            <Tooltip title={isLogin ? "Logout" : "Login"} arrow>
                                <NavIcon
                                    icon={
                                        isLogin ? <LogoutIcon /> : <LoginIcon />
                                    }
                                    onClick={isLogin ? logout : handleOpen}
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
    position: relative;
    padding-top: 50px;
`;

const HeaderVar = styled(AppBar)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110px;
`;

const NavIcon = styled(Tab)`
    cursor: pointer;
    float: left;
    width: 13%;
    height: 80px;
    text-align: center;
    line-height: 80px;
`;

const Wrap = styled.div`
    margin-top: 50px;
    float: left;
    width: 12%;
    text-align: center;
`;

const Details = styled.p`
    font-size: 12px;
    padding-left: 1px;
    padding-top: 6px;
`;

const MainTitle = styled.div`
    cursor: pointer;
    color: #5e5b52;
    font-size: 80px;
    float: left;
`;
