import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import crypto from "crypto-js";

import { DispatchContext } from "../../App";
import * as Api from "../../api";

const FormHelperTexts = styled(FormHelperText)`
  && {
    width: 100%;
    padding-left: 16px;
    font-weight: 300;
    color: #d32f2f;
  }
`;
const Boxs = styled(Box)`
  && {
    padding-bottom: 40px;
  }
`;

function LoginCard({ setIsSigning }) {
  const theme = createTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useContext(DispatchContext);

  // 이메일 및 패스워드 저장 여부
  const [isRemember, setIsRemember] = useState(false);
  // 이메일 및 패스워드 저장을 위한 쿠키 설정
  const [cookies, setCookie, removeCookie] = useCookies([
    "rememberEmail",
    "rememberPassword",
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    emailError: "올바른 형식의 이메일을 입력해주세요.",
    passwordError: "올바른 형식의 비밀번호를 입력해주세요.",
  });

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return password.match(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    );
  };
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
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
  }, [cookies.rememberEmail, cookies.rememberPassword]);

  useEffect(() => {
    if (!isEmailValid) {
      setErrorMessage((current) => {
        return {
          ...current,
          emailError: "올바른 형식의 이메일을 입력해주세요.",
        };
      });
    } else {
      setErrorMessage((current) => {
        return {
          ...current,
          emailError: "",
        };
      });
    }
  }, [isEmailValid]);

  useEffect(() => {
    if (!isPasswordValid) {
      setErrorMessage((current) => {
        return {
          ...current,
          passwordError: "올바른 형식의 비밀번호를 입력해주세요.",
        };
      });
    } else {
      setErrorMessage((current) => {
        return {
          ...current,
          passwordError: "",
        };
      });
    }
  }, [isPasswordValid]);

  const handleSubmit = async (event) => {
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

    try {
      // "auth/login" 엔드포인트로 post요청함.
      const res = await Api.post("auth/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // location의 state가 없다면 기본 페이지로 이동하고 state가 있다면 이전페이지인 state.from으로 이동함
      if (!location.state?.from) {
        navigate("/", { replace: true });
      } else {
        navigate(location.state.from, { replace: true });
      }
    } catch (err) {
      alert("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    autoComplete="email"
                    size="small"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      // if (isEmailValid) {
                      //   setErrorMessage((current) => {
                      //     return {
                      //       ...current,
                      //       emailError: "",
                      //     };
                      //   });
                      // } else {
                      //   setErrorMessage((current) => {
                      //     return {
                      //       ...current,
                      //       emailError: "올바른 형식의 이메일을 입력해주세요.",
                      //     };
                      //   });
                      // }
                      return;
                    }}
                    error={(errorMessage.emailError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    autoComplete="off"
                    size="small"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      // if (isPasswordValid) {
                      //   setErrorMessage((current) => {
                      //     return {
                      //       ...current,
                      //       passwordError: "",
                      //     };
                      //   });
                      // } else {
                      //   setErrorMessage((current) => {
                      //     return {
                      //       ...current,
                      //       passwordError:
                      //         "올바른 형식의 비밀번호를 입력해주세요.",
                      //     };
                      //   });
                      // }
                      return;
                    }}
                    error={(errorMessage.passwordError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(event) => setIsRemember(!isRemember)}
                        color="primary"
                      />
                    }
                    label="아이디 및 비밀번호 저장"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                disabled={!isFormValid}
              >
                로그인
              </Button>
              <Button variant="text" onClick={() => setIsSigning(true)}>
                회원가입
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginCard;
