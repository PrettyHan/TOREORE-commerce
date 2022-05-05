import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocialValidate } from "./useEditValidate/SocialValidate";
import { DispatchContext } from "../../../App";

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

function GeneralMember() {
    const navigate = useNavigate(); // 취소시, myPage로 다시 돌아감
    const dispatch = useContext(DispatchContext); // 로그인한 유저 정보를 다시 보내주기 위해
    const [errorMessage, setErrorMessage] = useState({}); // error 메시지 반환

    // 회원 정보 수정 창에서 변경 대상 값 (유저id는 변경 불가 = disabled)
    const [form, setForm] = useState({
        email: "",
        name: "",
        gender: "",
        phone: "",
        birth: "",
        hasAddtionalInfo: false,
    });

    // 폼데이터가 유효한지 검사 후 에러 메세지 반환 (비밀번호 변경 여부에 따라 분기처리를 위해 분리)
    const [isFormValid, getErrorMessage] = SocialValidate(form);

    // form 을 submit 할때, 서버에 put 요청 (변경값 반영)
    // 먼저, 비밀번호를 변경했는지를 확인 후, 그에 따라 validate 를 물어본다
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(isFormValid);
        if (isFormValid) {
            try {
                // 정보를 다 적고 확인 버튼을 누름 = 추가 정보를 받았음 true 처리
                const res = await Api.put("auth/user", {
                    ...form,
                    hasAddtionalInfo: true,
                });

                const addUserInfo = res.data;

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: addUserInfo,
                });

                alert("추가되었습니다!");
            } catch (err) {
                alert("실패하였습니다", err);
            }
        } else {
            console.log(errorMessage);
            alert("실패했습니다. 형식을 다시 확인해주세요");
        }
    };

    // form, confirmPassword의 변화에 따라, validate를 확인하여 error 메시지를 반환해냄
    useEffect(() => {
        setErrorMessage((current) => {
            return {
                ...current,
                ...getErrorMessage,
            };
        });
    }, [form]);

    //로그인한 user의 현재 정보들을 불러와서 form에 셋팅
    useEffect(() => {
        Api.get("auth/user").then((res) => {
            const result = res.data;
            console.log(result);
            setForm((cur) => {
                const newForm = {
                    ...cur,
                    email: result.email,
                    name: result.name,
                    gender: String(result.gender),
                    phone: result.phone,
                    birth: result.birth.slice(0, 10),
                    hasAddtionalInfo: result.hasAddionalInfo,
                };
                return newForm;
            });
        });
    }, []);

    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            <Grid>
                <Container>
                    <Title>추가 정보 입력</Title>
                    <Information>
                        💛 고객님께 더 나은 서비스를 제공하기 위해 추가 정보를
                        받고 있습니다. 💛
                    </Information>
                    <EditForm component="form" onSubmit={handleSubmit}>
                        <Items>
                            <Input
                                disabled
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="구글 주소"
                                autoComplete="email"
                                size="small"
                                value={form.email || ""}
                            />
                        </Items>
                        <Items>
                            <Input
                                required
                                fullWidth
                                autoFocus
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
                                onClick={() => navigate("/")}
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

const Information = styled.div`
    text-align: center;
    font-size: 15px;
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
