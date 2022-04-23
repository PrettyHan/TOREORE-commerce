import React from "react";
import { Box, Grid, Button } from "@mui/material";

function MyPage() {
  return (
    <div style={{ minHeight: "calc(100vh - 180px)" }}>
      <div
        style={{
          marginTop: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            width: "60%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <p> 000님 안녕하세요!</p>
              <p> (user123, Green-Class)</p>
            </Grid>
            <Grid item xs={4}>
              <Button>회원 정보 수정</Button>
            </Grid>
          </Grid>
        </Box>
        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <p>TOREOLRE는 그냥 쇼핑몰이 아닙니다!</p>
              <p>
                더 이상의 무분별한 추천! 견딜 수 없었습니다. <br />
                <br /> 내가 정말 필요하는 제품들, 또래들 사이 인기 있는 상품이
                먼저 나와 추천해준다면?
              </p>
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
        </Box> */}
      </div>
    </div>
  );
}

export default MyPage;
