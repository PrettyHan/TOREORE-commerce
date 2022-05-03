import React, { useEffect } from "react";

function Card() {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("");
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "order_no_0001", // 상점에서 관리하는 주문 번호
      name: "주문명:결제테스트",
      amount: 14000,
      buyer_email: "iamport@siot.do",
      buyer_name: "구매자이름",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "123-456",
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };
}
