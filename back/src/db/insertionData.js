import * as fs from "fs";

const dataBuffer = fs.readFileSync(
    "/Users/yanghaechan/vscode_workspace/elice_project/data-project/sample-project/back/src/db/Skirt.json",
);
const data = JSON.parse(dataBuffer.toString());
console.log(data[0]);

// 각 컬럼에 맞게 데이터 매핑
// uuid 생성
// imageURL은 S3에서 가져오기
