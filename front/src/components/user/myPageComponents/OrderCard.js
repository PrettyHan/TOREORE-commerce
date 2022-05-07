import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";

function OrderCard({ order }) {
    const navigate = useNavigate();
    const cartList = order.products[0].cart; // 주문내역 1개

    const productName = React.useMemo(() => {
        if (cartList.length === 1) {
            return cartList[0].name;
        } else {
            return `${cartList[0].name} 외 ${cartList.length - 1}건`;
        }
    }, [cartList]);

    // 주문 완료 vs 진행 중 상태를 구분자로 색상, 상태, 클릭시 nav 까지 달라져 변수로 저장
    const orderStatus = order.isPayed;

    // 미결제 건 클릭 시, order로 navigate 하여 결제 유도
    function sendOrder() {
        if (!orderStatus) {
            navigate(`/order/${order.orderId}`);
            console.log(order.orderId);
        } else {
            console.log("디테일보여주자");
        }
    }

    return (
        <Container container spacing={{ lg: 1, md: 2, sm: 1, xs: 1 }}>
            <Items item lg={3} md={6} sm={12} xs={12}>
                {order._id}
            </Items>
            <Items item lg={3} md={6} sm={12} xs={12}>
                {productName}
            </Items>
            <Items item lg={3} md={6} sm={12} xs={12}>
                {order.totalPrice}원
            </Items>
            <OrderStatus
                item
                lg={3}
                md={6}
                sm={12}
                xs={12}
                color={orderStatus}
                onClick={sendOrder}
            >
                {orderStatus ? (
                    "주문완료"
                ) : (
                    <Tooltip title="클릭 시, 주문 페이지로 갑니다." arrow>
                        <span>진행 중</span>
                    </Tooltip>
                )}
            </OrderStatus>
        </Container>
    );
}

const Container = styled(Grid)`
    width: 95%;
    margin-bottom: 20px;
    border: 1px solid #5e5b52;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Items = styled(Grid)`
    width: 20%;
    height: 50px;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
`;

const OrderStatus = styled(Grid)`
    width: 20%;
<<<<<<< HEAD
    height: 50px;
    color: ${(props) => (props.color === "done" ? "gray" : "red")};
=======
    height: 160px;
    text-align: center;
    line-height: 160px;
    color: ${(props) => (props.color === "done" ? "gray" : "#f77737")};
>>>>>>> data-analysis-front
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
`;
export default OrderCard;
