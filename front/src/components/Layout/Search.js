import React, { useRef, useState } from "react";
import Input from "@mui/material/Input";

import styled from "styled-components";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

import * as Api from "../../api";
import { useNavigate } from "react-router-dom";

function Search() {
    // 연관 키워드 배열
    const [RelatedKeywords, setRelatedKeywords] = useState([]);

    // InputBox
    const searchKeyword = useRef("");

    const navigate = useNavigate();

    // InputBox 엔터 핸들링
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    // 검색 버튼 클릭 핸들링
    const handleSearchClick = () => {
        setRelatedKeywords([]);
        navigate(`/products/search/${searchKeyword.current.value}`);
        searchKeyword.current.value = "";
    };

    // InputBox value 변경 핸들링
    const handleSearchChange = async () => {
        if (searchKeyword.current.value !== "") {
            const res = await Api.get(
                "products/search",
                { keyword: searchKeyword.current.value },
                true
            );
            const products = res.data.map((item) => item.name);
            setRelatedKeywords(products);
        }
    };

    // 연관 키워드 리스트 클릭 핸들링
    const handleLiClick = (e) => {
        searchKeyword.current.value = e.target.innerText;
        handleSearchClick();
    };

    return (
        <Wrapper>
            <InputBox
                variant="contained"
                color="action"
                placeholder="상품을 검색해보세요"
                inputRef={searchKeyword}
                onChange={handleSearchChange}
                onKeyPress={onKeyPress}
            ></InputBox>
            <Button
                startIcon={<SearchSharpIcon />}
                sx={{ width: "4%" }}
                size="large"
                color="inherit"
                disableElevation
                disableRipple
                onClick={handleSearchClick}
            ></Button>
            <Ul>
                {RelatedKeywords.map((item) => (
                    <Li onClick={handleLiClick}>{item}</Li>
                ))}
            </Ul>
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
    margin: 40px 0px;
    position: relative;
`;

const InputBox = styled(Input)`
    width: 40%;
    height: 30px;
`;

const Ul = styled.ul`
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 30px;
    left: 28%;
    list-style: none;
    background-color: white;
    width: 40%;
    z-index: 2;
    box-shadow: rgba(149, 157, 165, 0.5) 0px 8px 24px;
`;

const Li = styled.li`
    padding: 10px;
    &:hover {
        background-color: rgba(149, 157, 165, 0.3);
    }
`;

export default Search;
