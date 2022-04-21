import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Category = () => {
    // 임시 data
    const category1 = ["여성", "남성", "청소년", "아동", "홈"];
    const category2 = ["상의", "하의", "신발", "가방", "액세서리", "언더웨어"];

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {category1.map((item) => (
                        <Grid item xs={2}>
                            <Item>{item}</Item>
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {category2.map((item) => (
                        <Grid item xs={2}>
                            <Item>{item}</Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Category;
