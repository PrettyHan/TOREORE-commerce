import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OrderCard({ order }) {
    const navigate = useNavigate();

    const productName = React.useMemo(() => {
        if (order.orderProduct.length === 1) {
            return order.orderProduct;
        } else {
            return `${order.orderProduct[0]} 외 ${
                order.orderProduct.length - 1
            }건`;
        }
    }, [order.orderProduct]);

    // 주문 완료 vs 진행 중 상태를 구분자로 색상, 상태, 클릭시 nav 까지 달라져 변수로 저장
    const orderStatus = order.orderStatus;

    // 미결제 건 클릭 시, order로 navigate 하여 결제 유도

    function sendOrder() {
        if (orderStatus !== "done") {
            navigate(`/order/${order.orderId}`);
        } else {
            console.log("디테일보여주자");
        }
    }

    return (
        <Container>
            <Items>{order.orderNo}</Items>
            <Items>{order.orderId}</Items>
            <Items>{productName}</Items>
            <Items>{order.orderPrice}원</Items>
            <OrderStatus color={orderStatus} onClick={sendOrder}>
                {orderStatus === "done" ? "주문완료" : "진행 중"}
            </OrderStatus>
        </Container>
    );
}

const Container = styled.div`
    width: 95%;
    margin-bottom: 20px;
    border: 1px solid #5e5b52;
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Items = styled.div`
    width: 20%;
    height: 80px;
    text-align: center;
    line-height: 80px;
`;

const OrderStatus = styled.div`
    width: 20%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: ${(props) => (props.color === "done" ? "gray" : "red")};
    cursor: pointer;
`;
export default OrderCard;
