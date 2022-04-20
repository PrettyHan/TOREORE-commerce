import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import { useCookies } from "react-cookie";
import crypto from "crypto-js";

function LoginCard({ setIsSigning }) {
  const navigate = useNavigate();
  const location = useLocation();
  // redux dipatch
  const dispatch = useDispatch();

  // 이메일 및 패스워드 저장 여부
  const [isRemember, setIsRemember] = useState(false);
  // 이메일 및 패스워드 저장을 위한 쿠키 설정
  const [cookies, setCookie, removeCookie] = useCookies([
    "rememberEmail",
    "rememberPassword",
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  // 로그인페이지 접속 시 쿠키에 정보가 있다면 저장된 정보로 이메일과 패스워드 설정
  useEffect(() => {
    if (
      cookies.rememberEmail !== undefined &&
      cookies.rememberPassword !== undefined
    ) {
      let bytes = crypto.AES.decrypt(
        cookies.rememberPassword,
        "cookiePassword"
      );
      let rememberPassword = bytes.toString(crypto.enc.Utf8);
      setEmail(cookies.rememberEmail);
      setPassword(rememberPassword);
      setIsRemember(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isRemember) {
      setCookie("rememberEmail", email, { maxAge: 30000000 });
      setCookie(
        "rememberPassword",
        crypto.AES.encrypt(password, "cookiePassword").toString(),
        { maxAge: 30000000 }
      );
    } else {
      removeCookie("rememberEmail");
      removeCookie("rememberPassword");
    }

    let body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess === true) {
        const jwtToken = response.payload.token;
        sessionStorage.setItem("userToken", jwtToken);

        if (!location.state?.from) {
          navigate("/", { replace: true });
        } else {
          navigate(location.state.from, { replace: true });
        }
      } else {
        alert("Error");
      }
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center pt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상입니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="checkRemember" className="mt-3">
                <Form.Check
                  type="switch"
                  label="유저 이메일 비밀번호 저장"
                  value={isRemember}
                  onChange={(event) => {
                    setIsRemember(event.target.checked);
                  }}
                />
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    로그인
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => setIsSigning(true)}>
                    회원가입하기
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginCard;
