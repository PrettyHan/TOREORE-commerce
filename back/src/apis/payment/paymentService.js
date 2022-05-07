import axios from "axios";
import { orderService } from "../order/orderService";

const ready = async (req, res, next) => {
    // set variables
    const orderId = req.params.orderId;
    const { products, totalPrice } = await orderService.getOrder({ orderId });
    const item_name = "카카오페이";
    const quantity = "3";
    const total_amount = totalPrice;
    const vat_amount = 0;
    const tax_free_amount = 0;

    const approval_url = `http://localhost:3000/order/${orderId}/complete`; // 'http://example.com/success';
    const fail_url = `http://localhost:3000/order/${orderId}/complete`;
    const cancel_url = `http://localhost:3000/order/${orderId}/complete`;

    // set data
    const data = [
        "cid=TC0ONETIME",
        "partner_order_id=partner_order_id",
        "partner_user_id=partner_user_id",
        `item_name=${item_name}`,
        `quantity=${quantity}`,
        `total_amount=${total_amount}`,
        `vat_amount=${vat_amount}`,
        `tax_free_amount=${tax_free_amount}`,
        `approval_url=${approval_url}`,
        `fail_url=${fail_url}`,
        `cancel_url=${cancel_url}`,
    ].join("&"); // encode data (application/x-www-form-urlencoded)

    // send request (kakao payment)
    const reqToKakao = await axios.post(
        "https://kapi.kakao.com/v1/payment/ready",
        data,
        {
            headers: {
                Authorization: "KakaoAK f7fe2371c009eb72c5f781dd27b7267c",
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        },
    );

    res.json(reqToKakao.data);
};

const approve = async (req, res, next) => {
    const body = req.body;

    console.log(body);

    const data = [
        `cid=${body.cid}`,
        `tid=${body.tid}`,
        `partner_order_id=${body.partner_order_id}`,
        `partner_user_id=${body.partner_user_id}`,
        `pg_token=${body.pg_token}`,
    ].join("&");

    const res_ = await axios.post("https://kapi.kakao.com/v1/payment/approve", data, {
        headers: {
            Authorization: "KakaoAK f7fe2371c009eb72c5f781dd27b7267c",
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });

    res.json(res_.data);
};

export { ready, approve };
