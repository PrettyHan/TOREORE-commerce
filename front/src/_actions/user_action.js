import { LOGIN_USER, REGISTER_USER, LOGOUT } from "./types";

import * as Api from "../api";

// 로그인 action
export async function loginUser(dataToSubmit) {
  // Api를 통해 접근
  const request = await Api.post("/auth/login", dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: request.data,
  };
}

// 회원가입 action
export async function registerUser(dataToSubmit) {
  const request = await Api.post("/auth/signup", dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: request.data,
  };
}

// 로그아웃 action
export async function logout() {
  // 세션의 jwt토큰이 없으면 로그인이 되지 않은 것이므로 실패
  if (sessionStorage.getItem("userToken") === null) {
    alert("로그아웃 실패");
    return false;
  } else {
    // 세션의 jwt토큰을 지워준다.
    sessionStorage.removeItem("userToken");

    const request = await Api.get("users/logout", {});

    return {
      type: LOGOUT,
      payload: request.data,
    };
  }
}
