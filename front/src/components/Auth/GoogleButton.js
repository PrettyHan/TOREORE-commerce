import React from "react";
import GoogleLogin from "react-google-login";
import * as Api from "../../api";

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
        <div>
            <GoogleLogin
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
}
