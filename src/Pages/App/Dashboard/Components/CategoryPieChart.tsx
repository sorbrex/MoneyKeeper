import React, {useEffect, useState} from "react"
import { CategoryWithAmount } from "@/Types/Types"
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
	DoughnutControllerChartOptions,
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { getAllColors } from "@UI/Simple/CategoryIcon"
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

export default function CategoryPieChart(props: PieChartProps) {
	const data = props.data.map((category: CategoryWithAmount) => category.amount)
	const labels = props.data.map((tuple: CategoryWithAmount) => tuple.category)

	const chartOption = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "top" as const,
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
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	} as _DeepPartialObject<CoreChartOptions<"doughnut"> & ElementChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & DoughnutControllerChartOptions>

	const [chartData, setChartData] = useState({
		type: "doughnut",
		labels: labels,
		datasets: [
			{
				label: "Amount: ",
				data: data,
				backgroundColor: getAllColors(),
				borderColor: "#fff",
				borderWidth: 1,
				padding: 10,
				hoverOffset: 8
			}
		]
	})

	useEffect(() => {
		const data = props.data.map((category: CategoryWithAmount) => category.amount)

		setChartData({
			...chartData,
			labels: labels,
			datasets: [
				{
					...chartData.datasets[0],
					data: data
				}
			]
		})
	}, [props.data])

	return(
			<Doughnut data={chartData} options={chartOption}/>
	)
}

type PieChartProps = {
	data: CategoryWithAmount[]
}