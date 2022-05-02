import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateData } from "../Auth/Validate";
import { DispatchContext } from "../../App";

import * as Api from "../../api";

import styled from "styled-components";
import {
    Box,
    Button,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
} from "@mui/material";
const bcrypt = require("bcryptjs");

function UserEdit() {
    const navigate = useNavigate(); // 취소시, myPage로 다시 돌아감
    const dispatch = useContext(DispatchContext);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({});

    // 회원 정보 수정 창에서 변경 대상 값 (유저id 제외)
    const [form, setForm] = useState({
        email: "",
        password: "",
        userId: "",
        name: "",
        gender: "",
        phone: "",
        birth: "",
    });

    // 폼데이터가 유효한지 검사 후 에러 메세지 반환
    const [isFormValid, getErrorMessage] = ValidateData(form, confirmPassword);

    // form 을 submit 할때, 서버에 put 요청 (변경값 반영)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                const hashedPassword = await bcrypt.hash(form.password, 10);
                // "auth/user"로  PUT 요청함.
                const res = await Api.put("auth/user", {
                    ...form,
                    password: hashedPassword,
                });
                const editUser = res.data;

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: editUser,
                });

                alert("변경이 완료되었습니다.");
                // navigate("/login");
            } catch (err) {
                alert("변경에 실패하였습니다", err);
            }
        } else {
            alert("변경에 실패했습니다. 형식을 다시 확인해주세요");
        }
    };

    //로그인한 user의 현재 정보들을 불러와서 form에 셋팅
    useEffect(() => {
        Api.get("auth/user").then((res) => {
            const result = res.data;
            setForm((cur) => {
                const newForm = {
                    ...cur,
                    email: result.email,
                    password: result.password,
                    userId: result.userId,
                    name: result.name,
                    gender: String(result.gender),
                    phone: result.phone,
                    birth: result.birth.slice(0, 10),
                };
                return newForm;
            });
        });
    }, []);

    useEffect(() => {
        setErrorMessage((current) => {
            return {
                ...current,
                ...getErrorMessage,
            };
        });
    }, [form, confirmPassword]);

    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            <Grid>
                <Container>
                    <Title>회원 정보 수정</Title>
                    <EditForm component="form" onSubmit={handleSubmit}>
                        <Items>
                            <Input
                                required
                                autoFocus
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="이메일 주소"
                                autoComplete="email"
                                size="small"
                                value={form.email || ""}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                error={(errorMessage.emailError !== "") | false}
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.emailError}
                        </FormHelperTexts>
                        <Items>
                            <Input
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="새 비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                                autoComplete="off"
                                size="small"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                error={
                                    (errorMessage.passwordError !== "") | false
                                }
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.passwordError}
                        </FormHelperTexts>
                        <Items>
                            <Input
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                label="비밀번호 재입력"
                                autoComplete="off"
                                size="small"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                error={
                                    (errorMessage.passwordNotSameError !== "") |
                                    false
                                }
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.passwordNotSameError}
                        </FormHelperTexts>
                        <Items>
                            <Input
                                disabled
                                fullWidth
                                id="userId"
                                name="userId"
                                label="아이디"
                                autoComplete="userId"
                                size="small"
                                value={form.userId || ""}
                            />
                        </Items>
                        <Items>
                            <Input
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="이름"
                                autoComplete="name"
                                size="small"
                                value={form.name || ""}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                error={(errorMessage.nameError !== "") | false}
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.nameError}
                        </FormHelperTexts>
                        <GenderItems>
                            <FormLabel id="gender">성별</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender"
                                name="gender"
                                value={form.gender}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        gender: e.target.value,
                                    })
                                }
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
                        </GenderItems>
                        <FormHelperTexts>
                            {errorMessage.genderError}
                        </FormHelperTexts>
                        <Items>
                            <Input
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                label="전화번호 (000-0000-0000)"
                                autoComplete="phone"
                                size="small"
                                value={form.phone || ""}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                                error={(errorMessage.phoneError !== "") | false}
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.phoneError}
                        </FormHelperTexts>
                        <Items>
                            <Input
                                required
                                fullWidth
                                id="birth"
                                name="birth"
                                label="생년월일 (YYYY-MM-DD)"
                                autoComplete="birth"
                                size="small"
                                value={form.birth || ""}
                                onChange={(e) =>
                                    setForm({ ...form, birth: e.target.value })
                                }
                                error={(errorMessage.birthError !== "") | false}
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.birthError}
                        </FormHelperTexts>
                        <Items>
                            <Button
                                variant="contained"
                                type="submit"
                                disableElevation
                                disableRipple
                            >
                                확인
                            </Button>
                            <Button
                                type="reset"
                                variant="outlined"
                                onClick={() => navigate("/myPage")}
                            >
                                취소
                            </Button>
                        </Items>
                    </EditForm>
                </Container>
            </Grid>
        </div>
    );
}

export default UserEdit;

const Grid = styled.div`
    margin: 100px 0 100px 0;
    display: grid;
    row-gap: 20px;
    place-items: center center;
`;

const Container = styled.div`
    width: 40%;
    padding: 5px 0 0 0;
    box-shadow: black 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-align: left;
    font-size: 20px;
    margin: 0 0 23px 23px;
`;

const EditForm = styled(Box)`
    padding: 5px 0 0 0;
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 17px;
`;

const Items = styled.div`
    width: 50%;
    height: 80px;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const GenderItems = styled.div`
    width: 25%;
    height: 80px;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled(TextField)`
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
`;

const FormHelperTexts = styled(FormHelperText)`
    && {
        width: 100%;
        font-weight: 300;
        color: #d32f2f;
        text-align: center;
    }
`;
