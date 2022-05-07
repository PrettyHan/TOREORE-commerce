import React from "react";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import styled from "styled-components";

function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#DDDFDF",
                height: "auto",
                marginTop: "auto",
            }}
        >
            <hr style={{ border: "1px solid #5E5B52" }} />
            <FooterZone>
                <h2
                    style={{
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "#5E5B52",
                        textAlign: "center",
                    }}
                >
                    TOREOLRE (또래올래)
                </h2>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        style={{
                            color: "#5E5B52",
                            minWidth: "0",
                            padding: "0",
                        }}
                        size="100px"
                        startIcon={<GitHubIcon />}
                        href="https://kdt-gitlab.elice.io/ai_track/class_04/data_project/team12/sample-project"
                        target="_blank"
                    />
                </div>
                <p
                    style={{
                        fontSize: "15px",
                        color: "#5E5B52",
                        textAlign: "center",
                    }}
                >
                    법인명: 또래올래 주식회사 | 통신판매업신고번호 :
                    0000-서울강남-00000 / 사업자등록번호: 000-00-00000 | 대표자
                    : 코딩 순 서울특별시 강남구 영동대로 421, 9층 삼탄빌딩
                    (대치동) 06182 | 대표번호 000-123-4567 | info.kr@.com
                </p>
                <p
                    style={{
                        fontSize: "15px",
                        color: "#5E5B52",
                        textAlign: "center",
                        marginBottom: "0px",
                        paddingBottom: "20px",
                    }}
                >
                    이 사이트는 12팀 Coding Soon에 의해 제작되었으며 코딩 순의
                    자산입니다.
                </p>
            </FooterZone>
        </footer>
    );
}

export default Footer;

const FooterZone = styled.div`
  width: 98%,
  height: 100%,
  justify-content: center,
  margin-top: 0 auto,
  background-color: #EEFC57,
`;
