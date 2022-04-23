// import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

const ProductSchema = new Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            default: "상품의 설명을 입력해 주세요."
        },
        image: {
            type: String,
            required: false,
            default: "이미지 없음"
        },
    },
    {
        timestamps: true,
    },
);

const ProductModel = model("Product", ProductSchema);

export { ProductModel };
