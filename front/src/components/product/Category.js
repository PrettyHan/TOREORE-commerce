import { useNavigate } from "react-router-dom";
import "../../style/category.css";

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
            <div className="category-container">
                {category.map((item) => (
                    <div className="category">
                        <div
                            className="category-btn"
                            onClick={handleCategoryClick}
                        >
                            {item}
                        </div>
                        {/* <div className="sub-category">
                            {category2.map((item) => (
                                <div className="sub-category-btn">{item}</div>
                            ))}
                        </div> */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Category;
