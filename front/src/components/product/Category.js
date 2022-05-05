import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Category = () => {
    const category = ["T-shirt", "Sweater", "Trousers", "Skirt", "Sneakers"];

    const navigate = useNavigate();

    const handleCategoryClick = (e) => {
        const targetCategory = e.target.innerHTML;
        navigate(`/products/${targetCategory}`);
    };

    return (
        <>
            <div
                style={{
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            ></div>
            <Wrapper>
                {category.map((item, idx) => (
                    <CategoryBtn
                        key={`category-${idx}`}
                        className="category-btn"
                        onClick={handleCategoryClick}
                    >
                        {item}
                    </CategoryBtn>
                ))}
            </Wrapper>
        </>
    );
};

export default Category;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

const CategoryBtn = styled.div`
    border: 2px solid black;
    width: 180px;
    padding: 10px;
    margin: 10px;
    text-align: center;
    font-size: larger;
    &:hover {
        background-color: black;
        color: white;
    }
`;
