import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../../App";
import GeneralMember from "./GeneralMember";
import SocialMember from "./SocialMember";
import * as Api from "../../../api";

function UserEdit() {
    const userState = useContext(UserStateContext);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        Api.get("auth/user").then((res) => {
            const loginType = res.data.loginType;
            setUserType(loginType);
        });
    }, []);

    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            {userType === "BASIC" ? <GeneralMember /> : <SocialMember />}
        </div>
    );
}

export default UserEdit;
