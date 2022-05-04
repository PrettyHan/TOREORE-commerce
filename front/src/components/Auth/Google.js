import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { DispatchContext } from "../../App";

import * as Api from "../../api";

import styled from "styled-components";

const clientId =
    "430470352132-0f8bv97e0b17rmsef09boohfdcenagbq.apps.googleusercontent.com";

export default function Google({ handleClose }) {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const onSuccess = async (response) => {
        // 구글로 부터 받아온 accessToken을 같이 보냄.
        const res = await Api.post("auth/google", {
            accessToken: response.accessToken,
        });

        // 서버로 부터 구글에서 받아온 user 정보를 가져옴.
        const user = res.data;

        // JWT 토큰은 유저 정보의 token임.
        const jwtToken = user.accessToken;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        sessionStorage.setItem("userToken", jwtToken);
        // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: user.user,
        });

        const addInfo = user.user.hasAddtionalInfo;

        if (addInfo) {
            handleClose();
            navigate("/");
        } else {
            handleClose();
            navigate("/useredit");
        }
    };

    const onFailure = (error) => {
        console.log(error);
    };

    return (
        <Container>
            <GoogleLogin
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}
                render={(renderProps) => (
                    <Button onClick={renderProps.onClick}>
                        <Wrapper>
                            <Logo src="/googleLogo.png" alt="googleLogo"></Logo>
                            <Text>구글로 로그인하기</Text>
                        </Wrapper>
                    </Button>
                )}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid #5e5b52;
    border-radius: 5px;
    margin-top: 16px;
`;

const Button = styled.div`
    color: red;
    cursor: pointer;
    align-items: space-between;
    width: 410px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
`;

const Logo = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const Text = styled.span`
    color: #5e5b52;
    text-align: center;
    font-size: 14px;
`;
