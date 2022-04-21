import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Tab } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

// import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();
  // const useState = useContext(UserStateContext);
  // const dispatch = useContext(DispatchContext);

  // // 전역상태 user가 null이 아닌 경우 로그인 성공 상태!
  // const isLogin = !!useState.user;
  const isLogin = true;

  // // 로그아웃 함수
  // const logout = () => {
  //   // sessionStorage에 저장했던 JWT 토큰 삭제
  //   sessionStorage.removeItem("userToken");
  //   // dispatch 함수를 이용해 로그아웃함.
  //   dispatch({ type: "LOGOUT" });
  //   // 메인 화면으로 돌아감. ( 로그인 화면으로 돌아갈지는 생각 )
  //   navigate("/");
  // };

  const navStyle = {
    cursor: "pointer",
    float: "left",
    width: "13%",
    height: "80px",
    textAlign: "center",
    lineHeight: "80px",
  };
  return (
    <Box sx={{ flexGrow: 1, boxShadow: 0, mb: 3 }}>
      <AppBar position="fixed" color="transparent" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <Tab
            icon={<HelpOutlineOutlinedIcon />}
            style={{ paddingRight: 0, minWidth: "50px" }}
            textColor="secondary"
            indicatorColor="secondary"
            disableElevation
            disableRipple
            onClick={() => navigate("/introduce")}
          />
          <Typography
            style={{ paddingLeft: "1px", paddingTop: "6px", fontSize: "10px" }}
          >
            About TOREOLRE
          </Typography>
          <Box sx={{ flexGrow: 1, padding: 0 }} />
          <Typography
            style={{
              float: "left",
              width: "12%",
              marginTop: "30px",
            }}
          >
            <Typography
              style={{
                height: "50%",
                textAlign: "center",
              }}
            >
              또래와 함께 하는 쇼핑 ,
            </Typography>
          </Typography>

          <Typography
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              color: "#5E5B52",
              fontSize: "70px",
              float: "left",
              marginTop: "5px",
            }}
          >
            TOREOLRE
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {isLogin ? (
              <Tab
                icon={<LogoutIcon />}
                onClick={() => navigate("/login")}
                style={navStyle}
                textColor="secondary"
                indicatorColor="secondary"
                disableElevation
                disableRipple
              />
            ) : (
              <Tab
                icon={<LoginIcon />}
                onClick={() => navigate("/login")}
                style={navStyle}
                textColor="secondary"
                indicatorColor="secondary"
                disableElevation
                disableRipple
              />
            )}
            <Tab
              icon={<ShoppingCartOutlinedIcon />}
              onClick={() => navigate("/cart")}
              style={navStyle}
            >
              Cart
            </Tab>
            <Tab
              icon={<PersonOutlinedIcon />}
              onClick={() => navigate("/myPage")}
              style={navStyle}
            >
              MyPage
            </Tab>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
