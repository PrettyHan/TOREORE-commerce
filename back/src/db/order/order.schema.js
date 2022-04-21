// import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

const OrderSchema = new Schema(
    {
        order_id : {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        order_name: {
            type: String,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        order_name: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Object,
            required: true,
            default: null,
            properties: {
                country: {
                    type: String,
                },
                do: {
                    type: String
                },
                si: {
                    type: String
                },
                gu: {
                    type: String
                },
                ro: {
                    type: String
                },
                rest: {
                    type: String
                }, 
            }  
        },
        message: {
            type: String,
            required: false,
            default: "요청사항이 없습니다"
        },
        payment_method: {
            type: String,
            required: true,
        },
        is_payed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    },
);

const OrderModel = model("Order", OrderSchema);

export { OrderModel };
