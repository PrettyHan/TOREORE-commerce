import React from "react";
import { useNavigate } from "react-router-dom";
// import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();
  // const useState = useContext(UserStateContext);
  // const dispatch = useContext(DispatchContext);

  // // 전역상태 user가 null이 아닌 경우 로그인 성공 상태!
  // const isLogin = !!useState.user;

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
    height: "50px",
    textAlign: "center",
    lineHeight: "80px",
  };
  return (
    <div>
      <header class>
        <nav>
          <div onClick={() => navigate("/introduce")} style={navStyle}>
            Intro
          </div>
          <div onClick={() => navigate("/recommend")} style={navStyle}>
            추천Best
          </div>
          <div
            style={{
              float: "left",
              width: "10%",
              marginTop: "30px",
              marginLeft: "50px",
            }}
          >
            <span
              style={{
                height: "50%",
                textAlign: "center",
              }}
            >
              또래와
            </span>
            <br />
            <span>함께하는 쇼핑</span>
          </div>
          <span
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "60px",
              float: "left",
              marginTop: "5px",
            }}
          >
            TOREOLRE
          </span>
          <span onClick={() => navigate("/login")} style={navStyle}>
            Login
          </span>
          {/* {isLogin ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span onClick={() => navigate("/login")}>Login</span>
          )} */}
          <span onClick={() => navigate("/cart")} style={navStyle}>
            Cart
          </span>
          <span onClick={() => navigate("/myPage")} style={navStyle}>
            MyPage
          </span>
        </nav>
      </header>
    </div>
  );
}
export default Header;
