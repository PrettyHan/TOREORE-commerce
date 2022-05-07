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
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
                "잘못된 이메일 입니다.",
            ],
        },
        gender: {
            type: Number,
            required: false,
        },
        phone: {
            type: String,
            required: false,
            maxlength: 13,
            trim: true,
            match: /^\d{2,3}-\d{3,4}-\d{4}$/,
        },
        birth: {
            type: String,
            required: false,
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
            address1: {
                type: String,
                required: true,
            },
            address2: {
                type: String,
                required: false,
            },
            address2: {
                type: String,
                required: false,
            },
        },
        bookmark: {
            type: Array,
            required: false,
            default: [],
        },
        cart: {
            type: Array,
            required: false,
            default: [],

        },
        loginType: {
            type: String,
            required: false,
            default: "",
        },
        hasAddtionalInfo: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model("User", UserSchema);

export { UserModel };
