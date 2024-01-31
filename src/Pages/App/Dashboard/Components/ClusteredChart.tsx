import React, {useEffect, useState} from "react"
import {Category, Transaction} from "@/Types/Types"
import {getAllColors} from "@UI/Simple/CategoryIcon"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from "dayjs";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);



export default function ClusteredChart(props: ClusteredChartProps) {

	const options = {
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
		plugins: {
			legend: {
				display: false
			}
		}
	};
	const [chartData, setChartData] = useState({
		labels: [""],
		datasets: [
			{
				label: "Amount",
				data: [0]
			}
		]
	})

	function updateChartData (data: Transaction[], categoryList: Category[]) {
		if (!data || data.length <= 0) {
			return setChartData({
				...chartData,
				labels: ["None"],
				datasets: [
					{
						...chartData.datasets[0],
						label: "Amount",
						data: [0]
					}
				]
			})
		}

		const oldLabels = data.map((transaction: Transaction) => dayjs(transaction.createdAt).format("DD/MM/YYYY"))

		console.log("Old Labels: ", oldLabels)

		const labels = new Set<string>()
		oldLabels.forEach((label) => labels.add(label))

		// Initialize the final object with arrays of zeros for each type of transaction
		const resultObject: {[key: string]: number[]} = {}

		resultObject['expense'] = Array(labels.size).fill(0)
		resultObject['income'] = Array(labels.size).fill(0)

		// Loop through the original array and update the result object
		data.forEach((transaction, index) => {
			resultObject[transaction.type][index] += transaction.amount || 0
		})

		console.log("Result Object: ", resultObject)

		const dataset = Object.keys(resultObject).map((type) => {
			return {
				fill: true,
				label: type,
				data: resultObject[type],
				backgroundColor: type === "expense" ? "#F27289" : "#00B2A3",
				stack: type
			}
		})

		setChartData({
			...chartData,
			labels: Array.from(labels),
			datasets: dataset,
		})
	}


	useEffect(() => {
		updateChartData(props.data, props.categoryList)
		// console.log("Chart Data: ", chartData)
		// const data = props.data.map((category: CategoryWithAmount) => category.amount)
		//
		// setChartData({
		// 	...chartData,
		// 	labels: labels,
		// 	datasets: [
		// 		{
		// 			...chartData.datasets[0],
		// 			data: data
		// 		}
		// 	]
		// })
	}, [props])

	return(
		<Bar options={options} data={chartData} />
	)
}

type ClusteredChartProps = {
	data: Transaction[]
	categoryList: Category[]
}