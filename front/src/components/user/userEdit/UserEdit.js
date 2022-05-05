import React, { useContext } from "react";
import { UserStateContext } from "../../../App";
import GeneralMember from "./GeneralMember";
import SocialMember from "./SocialMember";

function UserEdit() {
    const userState = useContext(UserStateContext);
    const user = userState.user;

    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            {user.loginType === "BASIC" || user.hasAddtionalInfo === true ? (
                <GeneralMember />
            ) : (
                <SocialMember />
            )}
        </div>
    );
}

export default UserEdit;
