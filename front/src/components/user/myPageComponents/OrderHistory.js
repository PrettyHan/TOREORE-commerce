import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderCard from "./OrderCard";
import Grid from "@mui/material/Grid";

import * as Api from "../../../api";

const columns = ["주문번호", "주문상품", "금액 합계", "결제여부"];

const OrderHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const [isOrder, setIsOrder] = useState(false); // 주문 내역이 없을 경우 없다고 표기하기 위해 사용 하는 state

    const fetchOrderList = async () => {
        try {
            const res = await Api.get("orders");
            if (res.data) {
                setIsOrder(true);
                setOrderList(res.data);
            } else {
                console.log("빈내역 입니다");
                setIsOrder(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOrderList();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Title>주문 내역</Title>
                <Info>(결제 진행중 클릭 시 주문 페이지로 이동합니다. )</Info>
                <ListContainer>
                    <Columns container spacing={{ lg: 1, md: 2, sm: 1, xs: 1 }}>
                        {columns.map((column, idx) => (
                            <Items
                                item
                                lg={3}
                                md={6}
                                sm={12}
                                xs={12}
                                key={`item-${idx}`}
                            >
                                {column}
                            </Items>
                        ))}
                    </Columns>
                    {isOrder ? (
                        orderList.map((order, idx) => (
                            <OrderCard key={`order-${idx}`} order={order} />
                        ))
                    ) : (
                        <NoOrder>"주문 내역이 없습니다."</NoOrder>
                    )}
                </ListContainer>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    padding: 5px 0 0 0;
    row-gap: 20px;
    width: 68%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

const Wrapper = styled.div`
    width: 90%;
    box-shadow: #5e5b52 0px 0px 0px 1px, #dddfdf 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 0 20px;
`;

const Title = styled.div`
    font-align: left;
    font-size: 20px;
    margin: 0 0 3px 20px;
`;

const Info = styled.div`
    font-align: left;
    font-size: 13px;
    color: gray;
    margin: 0 0 23px 20px;
`;

const ListContainer = styled.div`
    padding: 5px 0 0 0;
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 17px;
`;

const Columns = styled(Grid)`
    width: 95%;
    margin-bottom: 20px;
    border: 1px solid #5e5b52;
    flex-wrap: wrap;
    flex-grow: 1;
`;

const Items = styled(Grid)`
    width: 20%;
    height: 40px;
    text-align: center;
    line-height: 17px;
    font-weight: bold;
`;

const NoOrder = styled.div`
    margin: 20px 0 30px 0;
    font-weight: bold;
    font-size: 15px;
    color: #5e5b52;
`;

export default OrderHistory;
