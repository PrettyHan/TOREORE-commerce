import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import Ad from "./Ad";

const Main = () => {
    const userState = useContext(UserStateContext);

    const isLogin = !!userState.user; // 로그인 여부 판단 
  
    return (
        <>
        {isLogin && <>
            안녕하세요
        </>}
            <Ad />
        </>
    );
};

export default Main;
