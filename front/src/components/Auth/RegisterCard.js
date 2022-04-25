import React, { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Container,
  RadioGroup,
  Radio,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

import * as Api from "../../api";
import { ValidateData } from "./Validate";

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

function RegisterCard({ setIsSigning }) {
  const theme = createTheme();

  const [checked, setChecked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [body, setBody] = useState({
    email: "",
    password: "",
    name: "",
    userId: "",
    gender: null,
    phone: "",
    birth: "",
  });
  const [errorMessage, setErrorMessage] = useState({});

  // 폼데이터가 유효한지 검사 후 에러 메세지 반환
  const [isFormValid, getErrorMessage] = ValidateData(
    body,
    confirmPassword,
    checked
  );

  useEffect(() => {
    setErrorMessage((current) => {
      return {
        ...current,
        ...getErrorMessage,
      };
    });
  }, [getErrorMessage]);
  // // date객체를 문자열로 변환
  // function dateToString(date) {
  //   return (
  //     date.getFullYear() +
  //     "-" +
  //     (date.getMonth() + 1).toString().padStart(2, "0") +
  //     "-" +
  //     date.getDate().toString().padStart(2, "0")
  //   );
  // }

  // body State변경
  const handleChange = (event) => {
    setBody((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // const handleDate = (value) => {
  //   setBirthDate(value);
  //   setBody((current) => {
  //     return {
  //       ...current,
  //       birth: dateToString(birthDate),
  //     };
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isFormValid) {
        // "auth/signup" 엔드포인트로 post요청함.
        await Api.post("auth/signup", body);
        setIsSigning(false);
      }
    } catch (err) {
      alert("회원가입에 실패하였습니다.\n", err);
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
                    value={body.email}
                    onChange={handleChange}
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
                    value={body.password}
                    onChange={handleChange}
                    error={(errorMessage.passwordError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="비밀번호 재입력"
                    autoComplete="off"
                    size="small"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    error={(errorMessage.passwordNotSameError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>
                  {errorMessage.passwordNotSameError}
                </FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    autoComplete="name"
                    size="small"
                    value={body.name}
                    onChange={handleChange}
                    error={(errorMessage.nameError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormLabel id="gender">성별</FormLabel>
                  <RadioGroup
                    aria-labelledby="gender"
                    name="gender"
                    value={body.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio size="small" />}
                      label="Female"
                      sx={{ fontSize: 12 }}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="Male"
                      sx={{ fontSize: 12 }}
                    />
                  </RadioGroup>
                </Grid>
                <FormHelperTexts>{errorMessage.genderError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userId"
                    name="userId"
                    label="닉네임"
                    autoComplete="userId"
                    size="small"
                    value={body.userId}
                    onChange={handleChange}
                    error={(errorMessage.userIdError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="전화번호"
                    autoComplete="phone"
                    size="small"
                    value={body.phone}
                    onChange={handleChange}
                    error={(errorMessage.phoneError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.phoneError}</FormHelperTexts>
                <Grid item xs={12}>
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label={"생년월일"}
                      value={birthDate}
                      onChange={handleDate}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider> */}
                  <TextField
                    required
                    fullWidth
                    id="birth"
                    name="birth"
                    label="생년월일 (YYYY-MM-DD)"
                    autoComplete="birth"
                    size="small"
                    value={body.birth}
                    onChange={handleChange}
                    error={(errorMessage.birthError !== "") | false}
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.birthError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
                <FormHelperTexts>{errorMessage.checkError}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                disabled={!isFormValid}
              >
                회원가입
              </Button>
              <Button variant="text" onClick={() => setIsSigning(false)}>
                로그인하기
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterCard;
