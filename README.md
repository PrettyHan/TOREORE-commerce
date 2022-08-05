### **`통계 데이터 기반 개인화 쇼핑 커머스 제작`**

- 쇼핑 커머스 이름 : TOREOLRE
- 연령별 의류 구매 데이터를 기반으로 유저에게 추천 의류 & 통계를 제공하는 서비스

### **`데이터세트`**

- [https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations](https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations)
- 연령별 구매가 많은 의류 카테고리 혹은 선호도가 높은 의류 이미지 등의 인사이트 추출 기대
- 이미지 데이터가 포함되어 30GB가 넘는 데이터 용량으로 데이터 전처리 및 선별이 중요할 것으로 생각됨
- 구매 소비자의 성별 데이터가 없어 성별에 따른 데이터 분석이 어려울 것으로 예상

### **`기획 방법`**

1. `보다 개인에게 맞춤화된 의류를 추천할 수 없을까`라는 문제에서 출발해 `연령대별 구매 데이터 기반 개인화 상품 추천 커머스`를 개발하고자 함
2. 용량과 성능을 고려해 데이터 분석은 구글 Colab에서 진행할 계획
3. pandas, numpy, matplotlib 등 라이브러리를 사용할 계획

### **`서비스 설명`**

1. 데이터분석 웹 서비스의 최종적인 메인기능과 서브기능

`MAIN`

- user MVP : 회원가입/회원탈퇴/회원수정
- order MVP : 장바구니/주문 확인/결제 api(테스트용) 연동
- like MVP : 즐겨찾기(북마크)
- product MVP : 제품 카테고리별 상품 탭
- search MVP: 상품 검색

`SUB + PLUS`

- 커머스 개요(소개)
- 커뮤니티 기능 : 각 제품에 대한 별점, 후기, 사진
- 데이터 셋에서 성별을 구별해서 성별/연령대 추천
1. 웹 서비스의 사용자가 데이터 분석 시각화 자료를 통해 얻는 인사이트
- H&M 구매 데이터 기반 상품 추천 관련 인사이트 제공
- 사용자 개인의 정보를 기반으로 비슷한 연령대가 많이 구매한 의류 추천 제공

### **`스토리보드 & 시나리오`**

- [https://www.figma.com/file/JCaUlMmd3SeyFIkqTR8CYl/Untitled?node-id=0%3A1](https://www.figma.com/file/JCaUlMmd3SeyFIkqTR8CYl/Untitled?node-id=0%3A1)
(프론트엔드 폴더구조 도식화 포함)

### **`API 문서 및 백엔드 모델링`**

- [https://documenter.getpostman.com/view/15413196/UyrAGxeE](https://documenter.getpostman.com/view/15413196/UyrAGxeE)
- [https://www.figma.com/file/qeJO2PNv7ndpokFmK60Nz6/data-project-DB-Modeling(Mongo-DB)-%26-API-end-point?node-id=0%3A1](https://www.figma.com/file/qeJO2PNv7ndpokFmK60Nz6/data-project-DB-Modeling(Mongo-DB)-%26-API-end-point?node-id=0%3A1)

