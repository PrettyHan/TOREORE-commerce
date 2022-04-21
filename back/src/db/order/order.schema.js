// import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

const OrderSchema = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
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
        Price: {
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
        images: {
            type: String,
            required: false,
            default: "이미지 없음"
        },
    },
    {
        timestamps: true,
    },
);

const OrderModel = model("Order", OrderSchema);

export { OrderModel };
