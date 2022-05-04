import React from "react";
import GoogleLogin from "react-google-login";
import * as Api from "../../api";

import styled from "styled-components";

const clientId =
    "430470352132-0f8bv97e0b17rmsef09boohfdcenagbq.apps.googleusercontent.com";

export default function GoogleButton() {
    const onSuccess = async (response) => {
        const {
            googleId,
            profileObj: { email, name },
        } = response;
        const sendToken = await Api.post("auth/google", {
            accessToken: response.accessToken,
        });

        console.log(sendToken.data);
        // const res = await Api.post("auth/login", {
        //     userId,
        //     password,
        // });
        // // 유저 정보는 response의 data임.
        // const user = res.data;
        // // JWT 토큰은 유저 정보의 token임.
        // const jwtToken = user.accessToken;
        // // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        // sessionStorage.setItem("userToken", jwtToken);
        // // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
        // dispatch({
        //     type: "LOGIN_SUCCESS",
        //     payload: user,
        // });

        // // // 새로고침
        // // navigate(0);
        // console.log(response);
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
    margin-top: 10px;
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
