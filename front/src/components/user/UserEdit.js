import React,{ useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ValidateData } from "../Auth/Validate";
import { UserStateContext } from "../../App";

import * as Api from "../../api";

import styled from "styled-components";
import { Box, Button, TextField } from "@mui/material";

function UserEdit() {
    const navigate = useNavigate();  // 취소시, myPage로 다시 돌아감 
    const userState = useContext(UserStateContext);

    // 회원 정보 수정 창에서 변경 대상 값 (유저id 제외)
    const [form, setForm] = useState({
        email: "",
        password: "",
        userId: "",
        name: "",
        phone: "",
        birth: "",
        zipcode: "",
    });

    // form 을 submit 할때, 서버에 put 요청 (변경값 반영)
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // "auth/user"로  PUT 요청함.
        const res = await Api.put("auth/user", {
            email: form.email,
            password: form.password,
            name: form.name,
            phone: form.phone,
            birth: form.birth,
            zipcode: form.zipcode,
        });
      };

    // 로그인한 user의 현재 정보들을 불러와서 form에 셋팅   
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
              phone: result.phone,
              birth: result.birth.slice(0,10),
              zipcode: result.zipcode,
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
            <EditForm component="form"
                 onSubmit={handleSubmit}
                >
                <Items >
                <Input required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    autoComplete="email"
                    size="small"
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </Items>
                <Items>
                <Input required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    autoComplete="off"
                    size="small"
                    value={form.password || ""}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </Items>
                <Items>
                <Input required
                    fullWidth
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="비밀번호 재입력"
                    autoComplete="off"
                    size="small"/>
                </Items>
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
                <Input required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    autoComplete="name"
                    size="small"
                    value={form.name || ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </Items>
                <Items>
                <Input required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="전화번호 (000-0000-0000)"
                    autoComplete="phone"
                    size="small"
                    value={form.phone || ""}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </Items>
                <Items>
                <Input required
                    fullWidth
                    id="birth"
                    name="birth"
                    label="생년월일 (YYYY-MM-DD)"
                    autoComplete="birth"
                    size="small"
                    value={form.birth || ""}
                    onChange={(e) => setForm({ ...form, birth: e.target.value })}
                    />
                </Items>
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
    margin-top: 100px;
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

const Input = styled(TextField)`
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
`;

