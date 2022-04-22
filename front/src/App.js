import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import Login from "./components/loginPage/LoginCard";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("auth/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<Login /> /* dev 브랜치에서 Main으로 수정*/}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
