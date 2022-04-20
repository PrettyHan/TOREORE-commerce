import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  // 전역상태에서 userState가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!state.loginSuccess;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    dispatch(logout()).then((response) => {
      if (response.payload.logoutSuccess) {
        alert("로그아웃 완료");
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem("userToken");
        navigate("/");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>TOREOLRE</Navbar.Brand>
        <Nav className="justify-content-end">
          {isLogin ? (
            <Nav.Item>
              <Nav.Link onClick={logout}>로그아웃</Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link>즐겨찾기</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>장바구니</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>추천 Best</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
