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
        <>
            <IntroTitle>About TOREOLRE ? </IntroTitle>
            <OuterDiv ref={outerDivRef}>
                <InnerDiv>
                    <Content>
                        <Title>
                            BEST 제품이
                            <br /> 나에게 필요하지 않다면?
                        </Title>
                        <Comment>
                            전체와 50대 남성의 판매량 TOP 10 제품 유형군과
                            비율이
                            <br /> 매우 상이한 것을 발견할 수 있습니다.
                        </Comment>
                        <b>
                            "TOREOLRE" 는 고객 한 분 한 분이 소중하기에 <br />
                            성별도 고려하여 정말 필요한 상품을 추천합니다.
                        </b>
                    </Content>
                    <DataAnalysisOne />
                </InnerDiv>
                <Divider />
                <InnerDiv>
                    <Content>
                        <Title>내 친구들이 입는 제품은 ?</Title>
                        <Comment>
                            동일 성별(남성), 다른 연령대(10대와 50대)의
                            <br /> 판매량 TOP 10 제품의 제품 유형을
                            비교해보겠습니다. <br />
                            T-shirt, shorts를 제외한 서로다른 제품 유형이
                            존재합니다.
                            <br />
                        </Comment>
                        <b>
                            또래올래에서는, <br />
                            또래(동일 연령대)들의 구매 데이터를 바탕으로 <br />
                            의류를 추천하여 고객의 쇼핑 만족도를 높입니다.
                        </b>
                    </Content>
                    <DataAnalysisTwo />
                </InnerDiv>
                <Divider />
                <InnerDiv>
                    <Content>
                        <Title>
                            고객 맞춤형 추천에 도전하는 <br />
                            TOREOLRE!
                        </Title>
                        <Comment>
                            성별과 연령을 확인하여, <br />
                            고객의 맞춤 인기 상품들 중 5개를 랜덤으로
                            추천합니다. <br />
                        </Comment>
                        <b>
                            고객에게 정말 원하는 제품을 추천하는 <br />
                            그날까지 노력하는 TOREOLRE 가 되겠습니다.
                        </b>
                    </Content>
                    <Wrapper>
                        <Image1></Image1>
                        <Image2></Image2>
                    </Wrapper>
                </InnerDiv>
            </OuterDiv>
            <Comment2>
                위 자료는 캐글 [H&M Personalized Fashion Recommendations] 자료를
                통해 도출하였습니다. <br />
                2020-04 ~ 06 거래내역 데이터를 추출하여 사용하였고, 거래량이
                가장 많았으며 현재 시기와 유사하기에 해당기간을 선택했습니다.{" "}
            </Comment2>
        </>
    );
}

export default Introduce;

const OuterDiv = styled.div`
    height: 80vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    margin: 10px 0 20px 0;
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
    width: 55%;
    min-width: 400px;
    height: 540px;
    line-height: 1.7;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image1 = styled.div`
    width: 90%;
    height: 50%;
    background-image: url("/30_female.PNG");
    background-size: cover;
    background-position: center center;
`;

const Image2 = styled.div`
    width: 90%;
    height: 50%;
    background-image: url("/50_male.PNG");
    background-size: cover;
    background-position: center center;
`;

const IntroTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin: 30px 0 0 50px;
    color: #3d1b54;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Comment = styled.div`
    font-size: 18px;
`;

const Comment2 = styled.div`
    margin: 20px 0 150px 0;
    font-size: 14px;
    text-align: center;
    color: gray;
`;
