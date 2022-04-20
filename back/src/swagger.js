
import swaggerUi from "swagger-ui-express"
import swaggereJsdoc from "swagger-jsdoc"


const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Coding Soon",
      description:
        "Coding Soon....",
    },
    servers: [
      {
        url: "http://localhost:5001", // 요청 URL
      },
    ],
  },
  apis: [], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

export {specs}
export {swaggerUi}