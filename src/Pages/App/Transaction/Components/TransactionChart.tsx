import React, {useEffect, useState} from "react";
import { NormalizedTransactionForChart} from "@/Types/Types";
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	CoreChartOptions,
	ElementChartOptions,
	PluginChartOptions,
	DatasetChartOptions,
	ScaleChartOptions,
	ChartTypeRegistry, LineControllerChartOptions,
} from 'chart.js';
import {getAllColors} from "@UI/Simple/CategoryIcon";
import {_DeepPartialObject} from "chart.js/dist/types/utils";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);


export default function TransactionChart(props: TransactionChartProps) {

	//const data = props.data.map((tuple) => tuple.category)
	//const labels = props.data.map((tuple) => tuple.date)

	const chartOption = {
		responsive: true,
		elements: {
			line: {
				tension: 0.3
			}
		},
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				align: "center",
				fullSize: true,
				labels: {
					boxWidth: 20,
					boxHeight: 20,
					padding: 20,
					usePointStyle: true,
					font: {
						size: 14,
					}
				}
			}
		},
	} as _DeepPartialObject<CoreChartOptions<"line"> & ElementChartOptions<"line"> & PluginChartOptions<"line"> & DatasetChartOptions<"line"> & LineControllerChartOptions>

	const [chartData, setChartData] = useState({
		//labels: labels,
		datasets: [
			{
				fill: true,
				label: 'Casa',
				data: [25, 59, 80, 81, 56, 55, 40],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
			{
				fill: true,
				label: 'Macchina',
				data: [32, 55, 45, 67, 89, 23, 45],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				fill: true,
				label: 'Medicine',
				data: [13, 25, 59, 80, 81, 56, 55],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
			{
				fill: true,
				label: 'Passatempi',
				data: [42, 13, 25, 59, 80, 81, 56],
				borderColor: 'rgb(255, 205, 86)',
				backgroundColor: 'rgba(255, 205, 86, 0.5)',
			}
		]
	})

	//
	// useEffect(() => {
	// 	const data = props.data.map((category) => category.amount)
	//
	// 	setChartData({
	// 		...chartData,
	// 		labels: labels,
	// 		datasets: [
	// 			{
	// 				...chartData.datasets[0],
	// 				// data: data
	// 			}
	// 		]
	// 	})
	// }, [props.data])



	return (
		<Line data={chartData} options={chartOption} />
	);
}

type TransactionChartProps = {
	data: NormalizedTransactionForChart
}