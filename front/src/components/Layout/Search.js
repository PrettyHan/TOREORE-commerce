import React from "react";
import Input from "@mui/material/Input";

import styled from "styled-components";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

function Search() {
    return (
        <Wrapper>
            <InputBox
                variant="contained"
                color="action"
                placeholder="상품을 검색해보세요"
            ></InputBox>
            <Button
                startIcon={<SearchSharpIcon />}
                size="large"
                color="inherit"
                disableElevation
                disableRipple
            ></Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 30px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 40px 0 40px 0;
`;

const InputBox = styled(Input)`
    width: 40%;
    height: 30px;
`;

export default Search;
