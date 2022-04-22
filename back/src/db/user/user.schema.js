// import { Schema, model } from "mongoose";
import pkg from "mongoose";

const { Schema, model } = pkg;

const UserSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: 1,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: [
                function (password) {
                    return password && password.length > 6;
                },
                "비밀번호를 입력하거나 길이가 6보다커야합니다.",
            ],
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: 1,
            trim: true,
            lowercase: true,
            validate: [
                function (email) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        email,
                    );
                },
                "잘못된 이메일 입니다.",
            ],
        },
        gender: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            maxlength: 13,
            trim: true,
            match: /^\d{2,3}-\d{3,4}-\d{4}$/,
        },
        birth: {
            type: Date,
            required: true,
            maxlength: 10,
            trim: true,
        },
        preferColor: {
            type: Array,
            required: false,
            default: null,
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
        bookmark: {
            type: Array,
            required: false,
            default: null,
        },
        cart: {
            type: Array,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model("User", UserSchema);

export { UserModel };
