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
import { DispatchContext } from "../../App";
import * as Api from "../../api";

import Google from "./Google";

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

function LoginCard({ setIsSigning, handleClose }) {
    const theme = createTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useContext(DispatchContext);

    // 이메일 및 패스워드 저장 여부
    const [isRemember, setIsRemember] = useState(false);
    // 이메일 및 패스워드 저장을 위한 쿠키 설정
    const [cookies, setCookie, removeCookie] = useCookies(["rememberuserId"]);

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        userIdError: "",
        passwordError: "",
    });

    const validateId = (userId) => {
        return userId.length >= 2;
    };
    const validatePassword = (password) => {
        return password.match(
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        );
    };
    const isUserIdValid = validateId(userId);
    const isPasswordValid = validatePassword(password);
    const isFormValid = isUserIdValid && isPasswordValid;

    // 로그인페이지 접속 시 쿠키에 정보가 있다면 저장된 정보로 이메일과 패스워드 설정
    useEffect(() => {
        if (cookies.rememberUserId !== undefined) {
            setUserId(cookies.rememberUserId);
            setIsRemember(true);
        }
    }, [cookies.rememberUserId]);

    useEffect(() => {
        if (!isUserIdValid) {
            setErrorMessage((current) => {
                return {
                    ...current,
                    userIdError: "아이디는 두글자 이상이여야 합니다.",
                };
            });
        } else {
            setErrorMessage((current) => {
                return {
                    ...current,
                    userIdError: "",
                };
            });
        }
    }, [userId]);

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
    }, [password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isRemember) {
            setCookie("rememberUserId", userId, { maxAge: 30000000 });
        } else {
            removeCookie("rememberUserId");
        }

        try {
            // "auth/login" 엔드포인트로 post요청함.
            const res = await Api.post("auth/login", {
                userId,
                password,
            });
            // 유저 정보는 response의 data임.
            const user = res.data;
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.accessToken;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem("userToken", jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            // 새로고침
            navigate(0);
        } catch (err) {
            alert("로그인에 실패하였습니다", err);
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
                                        type="userId"
                                        id="userId"
                                        name="userId"
                                        label="아이디"
                                        autoComplete="userId"
                                        size="small"
                                        value={userId}
                                        onChange={(event) => {
                                            setUserId(event.target.value);
                                        }}
                                        error={
                                            (errorMessage.userIdError !== "") |
                                            false
                                        }
                                    />
                                </Grid>
                                <FormHelperTexts>
                                    {errorMessage.userIdError}
                                </FormHelperTexts>
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
                                        }}
                                        error={
                                            (errorMessage.passwordError !==
                                                "") |
                                            false
                                        }
                                    />
                                </Grid>
                                <FormHelperTexts>
                                    {errorMessage.passwordError}
                                </FormHelperTexts>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={(event) =>
                                                    setIsRemember(!isRemember)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="아이디 저장"
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
                            <Button
                                variant="text"
                                onClick={() => setIsSigning(true)}
                            >
                                회원가입
                            </Button>
                            <Google variant="text" handleClose={handleClose} />
                        </FormControl>
                    </Boxs>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginCard;
