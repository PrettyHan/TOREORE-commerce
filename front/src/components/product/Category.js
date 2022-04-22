import "../../style/category.css";

const Category = () => {
    // 임시 data
    const category1 = ["여성", "남성", "청소년", "아동", "홈"];
    const category2 = ["상의", "하의", "신발", "가방", "액세서리"];

    return (
        <>
            <div className="category-container">
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
