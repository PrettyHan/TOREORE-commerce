import React, { useState } from "react";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

function Login() {
  const [isSigning, setIsSigning] = useState(false);

  return (
    <>
      {!isSigning ? (
        <LoginCard setIsSigning={setIsSigning} />
      ) : (
        <RegisterCard setIsSigning={setIsSigning} />
      )}
    </>
  );
}

export default Login;
