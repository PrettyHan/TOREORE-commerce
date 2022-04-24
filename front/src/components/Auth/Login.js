import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { UserStateContext } from "../../App";
import { Modal, Box } from "@mui/material";
import styled from "styled-components";

const LoginBox = styled(Box)`
  && {
    position: "absolute";
    top: "50%";
    left: "50%";
    transform: "translate(-50%, -50%)";
    width: 400;
    bgcolor: #ffffff;
    border: "2px solid #000";
    boxshadow: 24;
    p: 4;
  }
`;

const LoginModal = styled(Modal)`
&& {position:'absolute';
top:'10%';
left:'10%';
overflow:'scroll';
height:'100%';
display:'block;}
`;

function Login({ open, handleClose }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [isSigning, setIsSigning] = useState(false);

  // useEffect(() => {
  //   // 만약 전역 상태의 user가 있다면, 로그인을 한 상태이므로 메인 페이지로 이동함.
  //   if (userState.user) {
  //     alert("이미 로그인하셨습니다.");
  //     return navigate("/Main");
  //   }
  // }, [userState, navigate]);

  return (
    <LoginModal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={handleClose}
    >
      <LoginBox sx={{ backgroundColor: "#FFFFFF" }}>
        {!isSigning ? (
          <LoginCard setIsSigning={setIsSigning} />
        ) : (
          <RegisterCard setIsSigning={setIsSigning} />
        )}
      </LoginBox>
    </LoginModal>
  );
}

export default Login;
