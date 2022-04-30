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
            address1: {
                type : String,
                required : true,
            },
            address2: {
                type : String,
                required : false,
            }
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
