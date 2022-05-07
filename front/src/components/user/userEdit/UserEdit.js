import React, { useContext } from "react";
import { UserStateContext } from "../../../App";
import GeneralMember from "./GeneralMember";
import SocialMember from "./SocialMember";

const UserEdit = () => {
    const userState = useContext(UserStateContext);
    const user = userState.user; // 로그인한 유저정보를 저장하여

    // 일반회원 이거나, 소셜회원 중 추가정보를 입력한 유저에게는 일반 edit form을
    // 소셜회원 중 추가정보 입력을 안 한 유저는 socialmember edit으로 넘어간다
    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            {user.loginType === "BASIC" || user.hasAddtionalInfo === true ? (
                <GeneralMember />
            ) : (
                <SocialMember />
            )}
        </div>
    );
};

export default UserEdit;
