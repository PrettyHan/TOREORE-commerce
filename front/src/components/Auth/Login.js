import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { UserStateContext } from "../../App";
import { Modal } from "@mui/material";

function Login({ open, handleClose }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [isSigning, setIsSigning] = useState(false);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    // 만약 전역 상태의 user가 있다면, 로그인을 한 상태이므로 메인 페이지로 이동함.
    if (userState.user) {
      alert("이미 로그인하셨습니다.");
      return navigate("/Main");
    }
  }, [userState, navigate]);
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={handleClose}
    >
      {!isSigning ? (
        <LoginCard setIsSigning={setIsSigning} />
      ) : (
        <RegisterCard setIsSigning={setIsSigning} />
      )}
    </Modal>
  );
}

export default Login;
