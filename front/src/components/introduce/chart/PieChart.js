import styled from "styled-components";

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Title, Legend);

const PieChart = ({ jsonData, title }) => {
    let data = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 205, 86)",
                    "rgb(54, 162, 235)",
                    "rgb(75, 192, 192)",
                    "rgb(201, 203, 207)",
                    "rgb(153, 102, 255)",
                ],
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

        // console.log(result);
        data.labels = Object.keys(result);
        data.datasets[0].data = Object.values(result);
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
    border: solid red;
    display: inline-block;
    width: 700px;
    height: 700px;
`;
