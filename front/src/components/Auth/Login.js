import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { UserStateContext } from "../../App";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// const LoginModal = styled(Modal)`
// && {position:'absolute';
// top:'10%';
// left:'10%';
// overflow:'scroll';
// height:'100%';
// display:'block;}
// `;

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
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"body"}
            aria-labelledby="scroll-dialog-title"
        >
            <DialogTitle id="scroll-dialog-title">
                {!isSigning ? "로그인" : "회원가입"}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box>
                    {!isSigning ? (
                        <LoginCard
                            setIsSigning={setIsSigning}
                            handleClose={handleClose}
                        />
                    ) : (
                        <RegisterCard setIsSigning={setIsSigning} />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default Login;
