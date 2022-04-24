import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "TOREOLRE",
            description:
                "엘리스 AI 트랙 2차 데이터 프로젝트 팀 CODING SOON의 API DOCUMENT.",
        },
        servers: [
            {
                url: "http://localhost:5001", // 요청 URL
            },
        ],
    },
    apis: ["../mvp/user/userRouter.js", "../mvp/product/productRouter.js"], //Swagger 파일 연동, "../mvp/order/orderRouter.js"
};
const specs = swaggereJsdoc(options);

export { swaggerUi, specs };
