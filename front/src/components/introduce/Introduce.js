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
                <Content>
                    <Title>
                        연령에 따른
                        <br /> 제품 유형의 차이
                    </Title>
                    동일 성별(남성), 다른 연령대(10대와 50대)의 판매량 TOP 10
                    제품의 제품 유형을 파이 차트로 표현하였습니다. 연령대별로
                    제품 유형의 비율이 매우 상이한 것을 발견할 수 있습니다.
                    <br />
                    <b>
                        또래오래에서는 또래(동일 연령대)들의 구매 데이터를
                        바탕으로 의류를 추천하여 고객의 쇼핑 만족도를 높입니다.
                    </b>
                </Content>
                <DataAnalysis />
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
    background-color: #e1eeff;
`;

const Divider = styled.div`
    width: 100%;
    height: 5px;
    background-color: gray;
`;

const Content = styled.div`
    margin: 40px;
    width: 30%;
    min-width: 400px;
    height: 350px;
    font-size: 1.3rem;
    line-height: 1.7;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
`;
