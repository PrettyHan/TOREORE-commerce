import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api"; // 백엔드 완성 시 작성 예정 (?)

import { loginReducer } from "./reducer";
// 컴포넌트들
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import Footer from "./components/Layout/Footer";
import NotFound from "./components/Layout/NotFound";
import Introduce from "./components/introduce/Introduce";
import MyPage from "./components/user/MyPage";
import UserEdit from "./components/user/userEdit/UserEdit";
import Login from "./components/Auth/Login";
import ProductList from "./components/product/ProductList";
import Category from "./components/product/Category";
import Cart from "./components/cart/Cart";
import Search from "./components/Layout/Search";
import Order from "./components/order/Order";
import OrderComplete from "./components/order/OrderComplete";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import styled from "styled-components";

const ProductDetail = React.lazy(() =>
    import("./components/product/ProductDetail")
);

// import RegisterForm from "./components/user/RegisterForm";
// import Portfolio from "./components/Portfolio";
// import Loading from "./components/Loading";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
    const [scrollY, setScrollY] = useState(0);
    const [topBtnShow, setTopBtnShow] = useState(false);

    const handleFollow = () => {
        setScrollY(window.pageYOffset);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setScrollY(0);
        setTopBtnShow(false);
    };

    // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    // 로그인 다이얼로그를 여는지
    const [open, setOpen] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get("auth/user");
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
            });
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }

        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();

        const watch = () => {
            window.addEventListener("scroll", handleFollow);
        };
        watch();
        return () => {
            window.removeEventListener("scroll", handleFollow);
        };
    }, []);

    useEffect(() => {
        if (scrollY > 200) {
            setTopBtnShow(true);
        } else {
            setTopBtnShow(false);
        }
    }, [scrollY]);

    if (!isFetchCompleted) {
        return "isLoading...";
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Router>
                        <Header handleOpen={handleOpen} />
                        <Login open={open} handleClose={handleClose} />

                        <Routes>
                            <Route element={<Category />}>
                                <Route element={<Search />}>
                                    <Route path="/" exact element={<Main />} />
                                    <Route
                                        path="/myPage"
                                        element={<MyPage />}
                                    />
                                    <Route
                                        path="/useredit"
                                        element={<UserEdit />}
                                    />
                                    <Route
                                        path="/auth/:id"
                                        element={<Main />}
                                    />
                                    <Route path="*" element={<NotFound />} />
                                    <Route
                                        exact
                                        path="/products/:category"
                                        element={<ProductList />}
                                    />
                                    <Route
                                        exact
                                        path="/products/search/:keyword"
                                        element={<ProductList />}
                                    />
                                    <Route
                                        exact
                                        path="/products/:category/:productId"
                                        element={<ProductDetail />}
                                    />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route
                                        path="/order/:orderId"
                                        element={<Order />}
                                    />
                                    <Route
                                        path="/order/:orderId/complete"
                                        element={<OrderComplete />}
                                    />
                                </Route>
                            </Route>
                            <Route path="/introduce" element={<Introduce />} />
                        </Routes>
                        {topBtnShow && (
                            <TopBtn onClick={scrollToTop}>
                                <ArrowUpwardTwoToneIcon />
                            </TopBtn>
                        )}
                        <Footer />
                    </Router>
                </React.Suspense>
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;

const TopBtn = styled.button`
    background-color: #5e5b52;
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: white;
    border: none;
`;
