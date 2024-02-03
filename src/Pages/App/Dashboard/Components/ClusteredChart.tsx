import React, {useEffect, useState} from "react"
import {Transaction} from "@/Types/Types"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import {getAllColors} from "@UI/Simple/CategoryIcon"
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
)



export default function ClusteredChart(props: ClusteredChartProps) {

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		}
	}
	const [chartData, setChartData] = useState({
		labels: [""],
		datasets: [
			{
				label: "Amount",
				data: [0],
				backgroundColor: getAllColors()[0]
			}
		]
	})

	function updateData(originalData: Transaction[]) {
		if (!originalData || originalData.length === 0) {
			return setChartData({
				...chartData,
				labels: [""],
				datasets: [
					{
						label: "None",
						data: [0],
						backgroundColor: getAllColors()[0],
					}
				],
			})
		}

		const parsedData: {[key: string]: {[key:string]: number}} = {}

		originalData.forEach((singleTransaction) => {
			const date = new Date(singleTransaction.createdAt).toLocaleDateString()

			if (!parsedData[date]) {
				parsedData[date] = { expense: 0, income: 0 }
			}

			if (singleTransaction.type === "income") {
				parsedData[date].income += singleTransaction.amount
			} else if (singleTransaction.type === "expense") {
				parsedData[date].expense += singleTransaction.amount
			}
		})

		const uniqueDates = Object.keys(parsedData)

		const datasets = [
			{
				label: "Income",
				data: uniqueDates.map((date) => parsedData[date]?.income || 0),
				backgroundColor: "#00B2A3", // Green color for income
			},
			{
				label: "Expense",
				data: uniqueDates.map((date) => parsedData[date]?.expense || 0),
				backgroundColor: "#F27289", // Red color for expenses
			},
		]


		setChartData({
			...chartData,
			labels: uniqueDates,
			datasets: datasets
		})
	}

	useEffect(() => {
		updateData(props.data)
	}, [props])

	return(
		<Bar options={options} data={chartData} />
	)
}

type ClusteredChartProps = {
	data: Transaction[]
}