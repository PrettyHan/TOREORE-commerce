import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

function RegisterCard({ setIsSigning }) {
  const navigate = useNavigate();
  // redux dipatch
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;
  const isNameValid = name.length >= 2;

  const handleSubmit = (event) => {
    event.preventDefault();

    let body = {
      email,
      password,
      name,
      address,
      phone,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.msg === "success") {
        alert("회원가입 완료");
        navigate("/");
      } else {
        alert(response.payload.msg);
      }
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center pt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="registerEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mt-3">
                <Form.Label>비밀번호 재확인</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {!isPasswordSame && (
                  <Form.Text className="text-success">
                    비밀번호가 일치하지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                {!isNameValid && (
                  <Form.Text className="text-success">
                    이름은 2글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerAddress" className="mt-3">
                <Form.Label>주소</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="registerPhone" className="mt-3">
                <Form.Label>휴대전화</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    회원가입
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => setIsSigning(false)}>
                    로그인하기
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

export default RegisterCard;
