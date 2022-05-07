import React, { useRef, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";

import { DataAnalysisOne, DataAnalysisTwo } from "./dataAnalysis";

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
                        BEST 제품이
                        <br /> 나에게 필요하지 않다면?
                    </Title>
                    전체와 연령대(50대 남성)의 판매량 TOP 10 제품 유형의 비율이
                    매우 상이한 것을 발견할 수 있습니다.
                    <br />
                    TOREOLRE 쇼핑몰은 여성 고객이 많아 TOP 10 제품의 대부분을
                    차지합니다
                    <br />
                    <b>
                        TOREOLRE 는 고객 한 분 한 분이 소중하기에 성별을
                        확인하여 고객이 정말 필요한 상품을 추천 드립니다.
                    </b>
                </Content>
                <DataAnalysisOne />
            </InnerDiv>
            <Divider />
            <InnerDiv>
                <Content>
                    <Title>내 친구들이 입는 제품은 ?</Title>
                    동일 성별(남성), 다른 연령대(10대와 50대)의
                    <br /> 판매량 TOP 10 제품의 제품 유형을 비교해보겠습니다.{" "}
                    <br />
                    T-shirt와 shorts를 제외한 서로다른 제품 유형들이 존재합니다.
                    <br />
                    <b>
                        또래올래에서는 또래(동일 연령대)들의 구매 데이터를
                        바탕으로 의류를 추천하여 고객의 쇼핑 만족도를 높입니다.
                    </b>
                </Content>
                <DataAnalysisTwo />
            </InnerDiv>
            <Divider />
            <InnerDiv>
                <Content>
                    <Title>
                        고객 개인화 추천 시스템에 도전하는 <br />
                        TOREOLRE!
                    </Title>
                    성별과 연령을 확인하여, 인기 제품 15개 중 5개 제품을
                    랜덤으로 보여드립니다. <br />
                    <b>
                        고객에게 정말 원하는 제품을 추천하는 그날까지 노력하는
                        TOREOLRE 가 되겠습니다.
                    </b>
                </Content>
                <Wrapper>
                    <Image></Image>
                </Wrapper>
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
    width: 31%;
    min-width: 400px;
    height: 350px;
    font-size: 1.3rem;
    line-height: 1.7;
    text-align: justify;
`;
const Wrapper = styled.div`
    margin: 40px;
    width: 45%;
    min-width: 400px;
    height: 350px;
    line-height: 1.7;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.div`
    width: 100%;
    height: 80%;
    background-image: url("/30_female.png");
    background-size: cover;
    background-position: center center;
    border: 1px solid #5e5b52;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
`;
