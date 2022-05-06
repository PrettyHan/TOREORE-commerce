import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../../api";

function OrderComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const isKaKao = location.state === null;

  const fetchPayComplete = async () => {
    try {
      const { orderUser, orderPayment } = location.state;
      const body = {
        zipcode: orderUser.zipcode,
        message: orderUser.message,
        ...orderPayment,
      };
      await Api.put(`orders/${orderId}`, body);
    } catch (err) {
      alert(`결제에 성공하지 못했습니다 \n ${err}`);
    }
  };

  const fetchKakaoComplete = async () => {
    try {
      const tid = localStorage.getItem("tid");
      const pgToken = new URLSearchParams(
        window.location.search.toString()
      ).get("pg_token");
      const body = {
        cid: "TC0ONETIME",
        tid: `${tid}`,
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: `${pgToken}`,
      };
      await Api.post("payments/approve", body);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!isKaKao) {
      fetchPayComplete();
    } else {
      fetchKakaoComplete();
    }
  }, []);

  return (
    <div style={{ minHeight: "calc(100vh - 180px)" }}>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      ></div>
      <Container>
        <Image></Image>
        <p>주문 완료</p>
        <Button onClick={() => navigate("/")}>🏠 홈으로</Button>
        <Button onClick={() => navigate("/myPage")}>마이페이지로</Button>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  position: absolute;
  width: 100%;
  height: 75%;
  color: #5e5b52;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-image: url("/Complete.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: #eefc57;
  border: 1px solid #5e5b52;
  cursor: pointer;
  margin-bottom: 30px;
`;

export default OrderComplete;
