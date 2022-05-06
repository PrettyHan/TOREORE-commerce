import PieChart from "./chart/PieChart";

import age10man from "./data/age10man_visualization.json";
import age50man from "./data/age50man_visualization.json";
import total from "./data/total_visualization.json";

const DataAnalysisOne = () => {
    return (
        <>
            <PieChart jsonData={total} title={"전체 TOP10 제품 유형"} />
            <PieChart jsonData={age50man} title={"50대 남성 TOP10 제품 유형"} />
        </>
    );
};

const DataAnalysisTwo = () => {
    return (
        <>
            <PieChart jsonData={age10man} title={"10대 남성 TOP10 제품 유형"} />
            <PieChart jsonData={age50man} title={"50대 남성 TOP10 제품 유형"} />
        </>
    );
};

export { DataAnalysisOne, DataAnalysisTwo };
