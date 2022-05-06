import React, { useRef, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";

import DataAnalysis from "./dataAnalysis";

function Introduce() {
    const outerDivRef = useRef();

    const DIVIDER_HEIGHT = 5;

    useEffect(() => {
        const wheelHandle = (e) => {
            e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight * 0.8; // 화면 세로길이, 100vh와 같습니다.

            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (
                    scrollTop >= pageHeight &&
                    scrollTop < pageHeight * 2
                ) {
                    //현재 2페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    // 현재 3페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            } else {
                // 스크롤 올릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (
                    scrollTop >= pageHeight &&
                    scrollTop < pageHeight * 2
                ) {
                    //현재 2페이지
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    // 현재 3페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandle);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandle);
        };
    }, []);

    return (
        <OuterDiv ref={outerDivRef}>
            <InnerDiv>
                <h1>시각화 자료 1</h1>
            </InnerDiv>
            <Divider />
            <InnerDiv>
                <h1>시각화 자료 2</h1>
            </InnerDiv>
            <Divider />
            <InnerDiv>
                <h1>시각화 자료 3</h1>
            </InnerDiv>
        </OuterDiv>
        // {/* <DataAnalysis /> */}
    );
}

export default Introduce;

const OuterDiv = styled.div`
    height: 80vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const InnerDiv = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: pink;
`;

const Divider = styled.div`
    width: 100%;
    height: 5px;
    background-color: gray;
`;
