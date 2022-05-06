import styled from "styled-components";

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Title, Legend);

const PieChart = ({ jsonData, title }) => {
    let data = {
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
        labels: [],
    };

    const setData = (jsonData) => {
        const arr = jsonData.map((x) => x.product_type_name);
        const result = {};
        arr.forEach((x) => {
            result[x] = (result[x] || 0) + 1;
        });

        data.labels = Object.keys(result);
        data.datasets[0].data = Object.values(result);

        if (title === "10대 남성 TOP10 제품 유형") {
            data.datasets[0].backgroundColor = [
                "rgb(255, 99, 132)",
                "rgb(255, 205, 86)",
                "rgb(54, 162, 235)",
                "rgb(75, 192, 192)",
            ];
        } else {
            data.datasets[0].backgroundColor = [
                "rgb(142, 120, 255)",
                "rgb(147, 255, 56)",
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(201, 203, 207)",
                "rgb(153, 102, 255)",
            ];
        }
    };

    setData(jsonData);

    let options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "",
                padding: {
                    top: 10,
                    bottom: 30,
                },
                font: {
                    weight: "bold",
                    size: "30rem",
                },
            },
        },
    };

    const setOptions = (title) => {
        options.plugins.title.text = title;
    };

    setOptions(title);

    return (
        <>
            <PieContainer>
                <Pie type="pie" data={data} options={options} />
            </PieContainer>
        </>
    );
};

export default PieChart;

const PieContainer = styled.div`
    display: inline-block;
    width: 500px;
    height: 500px;
`;
