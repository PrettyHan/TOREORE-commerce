import * as fs from "fs";
// import { Product } from "./product/product.model";

const dataBuffer = fs.readFileSync(
    "/Users/yanghaechan/vscode_workspace/elice_project/data-project/sample-project/back/product-data/Trousers.json",
);
const originData = JSON.parse(dataBuffer.toString());
console.log(originData[0]);

// 각 컬럼에 맞게 데이터 매핑
// uuid 생성 or article_id 중 고유id로 쓸거 정하기
// imageURL은 S3에서 가져오기

// insert할 데이터 만들기
const productData = originData.map((product) => {
    const data = {
        productId: product.article_id,
        name: product.prod_name,
        category: product.product_type_name,
        price: product.price,
        color: product.colour_group_name,
        description: product.detail_desc,
        image: "",
    };

    return data;
});

console.log(productData);
// Data Insertion to MongoDB
// try {
//     const result = await Product.createMany(productList);
//     console.log(
//         `${result.length}개의 데이터를 정상적으로 데이터베이스에 저장했습니다.`,
//     );
// } catch (error) {
//     console.log(error);
// }
