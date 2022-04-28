import { useNavigate } from "react-router-dom";
import "../../style/category.css";

const Category = () => {
    // 임시 data
    // 대분류 : index_group_name
    // 중분류 : product_group_name
    // 소분류 : product_type_name
    const category1 = [
        "Ladieswear",
        "Menswear",
        "Divided",
        "Baby/Children",
        "Sport",
    ];
    const category2 = [
        "Garment Upper body",
        "Garment Lower body",
        "Shoes",
        "Socks & Tights",
        "Bags",
        "Accessories",
    ];

    const navigate = useNavigate();

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
            <div
                className="category-container"
                onClick={() => {
                    navigate("./products");
                }}
            >
                {category1.map((item) => (
                    <div className="category">
                        <div className="category-btn">{item}</div>
                        <div className="sub-category">
                            {category2.map((item) => (
                                <div className="sub-category-btn">{item}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Category;
