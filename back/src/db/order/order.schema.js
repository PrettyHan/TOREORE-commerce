// import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        orderId: {
            type: Schema.Types.ObjectId,
        },
        products: {
            type: Array,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        orderName: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Object,
            required: false,
            default: null,
            properties: {
                country: {
                    type: String,
                },
                do: {
                    type: String,
                },
                si: {
                    type: String,
                },
                gu: {
                    type: String,
                },
                ro: {
                    type: String,
                },
                rest: {
                    type: String,
                },
            },
        },
        message: {
            type: String,
            required: false,
            default: "요청사항이 없습니다",
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        isPayed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const OrderModel = model("Order", OrderSchema);

export { OrderModel };
