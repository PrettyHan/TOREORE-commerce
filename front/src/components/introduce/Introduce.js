import React from "react";
import { Box, Grid } from "@mui/material";

function Introduce() {
    return (
        <div style={{ minHeight: "calc(100vh - 180px)" }}>
            <div
                style={{
                    marginTop: "100px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            ></div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={8}
                        style={{
                            height: "auto",
                            border: "1px solid #5E5B52",
                            textAlign: "center",
                            borderRadius: "60%",
                        }}
                    >
                        <p>TOREOLRE는 그냥 쇼핑몰이 아닙니다!</p>
                        <p>
                            더 이상의 무분별한 추천! 견딜 수 없었습니다. <br />
                            <br /> 내가 정말 필요하는 제품들, 또래들 사이 인기
                            있는 상품이 먼저 나와 추천해준다면?
                        </p>
                    </Grid>
                    <Grid item xs={4} style={{ height: "auto" }}>
                        <img src="https://cdn.pixabay.com/photo/2018/08/18/13/27/browser-3614768__340.png" />
                    </Grid>
                    <Grid item xs={4} style={{ height: "auto" }}>
                        <img src="https://cdn.pixabay.com/photo/2018/08/18/13/27/browser-3614768__340.png" />
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        style={{
                            height: "auto",
                            border: "1px solid #5E5B52",
                            textAlign: "center",
                            borderRadius: "60%",
                        }}
                    >
                        <p>안녕하십니까</p>
                    </Grid>
                </Grid>
            </Box>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

export default Introduce;
