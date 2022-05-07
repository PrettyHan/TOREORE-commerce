import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Validate } from "./useEditValidate/Validate";
import { ValidatePassword } from "./useEditValidate/ValidatePassword";
import { DispatchContext } from "../../../App";
import { UserStateContext } from "../../../App";

import * as Api from "../../../api";

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

function GeneralMember() {
    const navigate = useNavigate(); // 취소시, myPage로 다시 돌아감
    const userState = useContext(UserStateContext);
    const user = userState.user;
    const dispatch = useContext(DispatchContext); // 로그인한 유저 정보를 다시 보내주기 위해
    const [changePassword, setChangePassword] = useState(false); // 유저가 비밀번호를 수정 할 수도 있고 or 없고 분기 처리 state
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인란
    const [errorMessage, setErrorMessage] = useState({}); // error 메시지 반환

    // const socialUser = userState.user.loginType;

    // 회원 정보 수정 창에서 변경 대상 값 (유저id는 변경 불가 = disabled)
    const [form, setForm] = useState({
        email: "",
        password: "",
        userId: "",
        name: "",
        gender: "",
        phone: "",
        birth: "",
    });

    // 폼데이터가 유효한지 검사 후 에러 메세지 반환 (비밀번호 변경 여부에 따라 분기처리를 위해 분리)
    const [isFormValid, getErrorMessage] = Validate(form);
    const [isPasswordValid, getErrorPassword] = ValidatePassword(
        form,
        confirmPassword
    );

    // 비밀번호 변경할 때, state값 true로 변경
    const changedPassword = (e) => {
        setForm({
            ...form,
            password: e.target.value,
        });
        setChangePassword(true);
    };

    // form 을 submit 할때, 서버에 put 요청 (변경값 반영)
    // 먼저, 비밀번호를 변경했는지를 확인 후, 그에 따라 validate 를 물어본다
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (changePassword) {
            if (isFormValid && isPasswordValid) {
                try {
                    // 비밀번호 변경이 있으므로, hashing 처리하여 서버로 전송
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

                    // 메인 화면으로 돌아감.
                    navigate("/");

                    // sessionStorage에 저장했던 JWT 토큰 삭제
                    sessionStorage.removeItem("userToken");
                    // dispatch 함수를 이용해 로그아웃함.
                    dispatch({ type: "LOGOUT" });

                    alert("변경이 완료되었습니다. 다시 로그인 해주세요!");
                } catch (err) {
                    alert("변경에 실패하였습니다", err);
                }
            }
        } else if (isFormValid) {
            try {
                // "auth/user"로  PUT 요청함.
                // 비밀번호는 변경하지 않음으로, form 그대로 전송
                const res = await Api.put("auth/user", form);
                const editUser = res.data;

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: editUser,
                });

                alert("변경이 완료되었습니다.");
                navigate("/");
            } catch (err) {
                alert("변경에 실패하였습니다", err);
            }
        } else {
            alert("변경에 실패했습니다. 형식을 다시 확인해주세요");
        }
    };

    // form, confirmPassword의 변화에 따라, validate를 확인하여 error 메시지를 반환해냄
    useEffect(() => {
        setErrorMessage((current) => {
            return {
                ...current,
                ...getErrorMessage,
                ...getErrorPassword,
            };
        });
    }, [form, getErrorMessage, getErrorPassword]);

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
                                disabled={user.hasAddtionalInfo}
                                type="email"
                                id="email"
                                name="email"
                                label={
                                    user.hasAddtionalInfo
                                        ? "구글 주소"
                                        : "이메일 주소"
                                }
                                autoComplete="email"
                                size="small"
                                value={form.email || ""}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                                error={(errorMessage.emailError !== "") | false}
                            />
                        </Items>
                        <FormHelperTexts>
                            {errorMessage.emailError}
                        </FormHelperTexts>
                        {user.loginType === "BASIC" ? (
                            <>
                                <Items>
                                    <Input
                                        fullWidth
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="새 비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                                        autoComplete="off"
                                        size="small"
                                        onChange={changedPassword}
                                        error={
                                            (errorMessage.passwordError !==
                                                "") |
                                            false
                                        }
                                    />
                                </Items>
                                <FormHelperTexts>
                                    {errorMessage.passwordError}
                                </FormHelperTexts>
                            </>
                        ) : (
                            <></>
                        )}

                        {changePassword && (
                            <>
                                <Items>
                                    <Input
                                        fullWidth
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="비밀번호 재입력"
                                        autoComplete="off"
                                        size="small"
                                        value={
                                            changePassword && confirmPassword
                                        }
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        error={
                                            changePassword &&
                                            (errorMessage.passwordNotSameError !==
                                                "") |
                                                false
                                        }
                                    />
                                </Items>
                                <FormHelperTexts>
                                    {errorMessage.passwordNotSameError}
                                </FormHelperTexts>
                            </>
                        )}

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

export default GeneralMember;

const Grid = styled.div`
    margin: 20px 0 100px 0;
    display: grid;
    row-gap: 20px;
    place-items: center center;
`;

const Container = styled.div`
    width: 70%;
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
