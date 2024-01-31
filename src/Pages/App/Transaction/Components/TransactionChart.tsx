import React, {useEffect, useState} from "react"
import {Category, Transaction} from "@/Types/Types"
import { Line } from "react-chartjs-2"
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
	LineControllerChartOptions,
} from "chart.js"
import {getAllColors} from "@UI/Simple/CategoryIcon"
import {_DeepPartialObject} from "chart.js/dist/types/utils"
import dayjs from "dayjs"
import "chart.js/auto" // ADD THIS

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)


export default function TransactionAreaChart(props: TransactionAreaChartProps) {

	// Normalize Data For Chart
	function updateData (data: Array<Transaction>, categoryList: Array<Category>, showIncome = false) {
		if (!data || data.length === 0) {
			setChartData({
				...chartData,
				labels: [""],
				datasets: [
					{
						fill: true,
						label: "None",
						data: [0],
						borderColor: getAllColors()[0],
						backgroundColor: getAllColors()[0] + "50",
					}
				],
			})
			return console.log("No Data")
		}

		//Expense or Income?
		if(showIncome) {
			data = data.filter((transaction: Transaction) => transaction.type === "income")
		} else {
			data = data.filter((transaction: Transaction) => transaction.type === "expense")
		}

		// Initialize the final object with arrays of zeros
		const resultObject: {[key: string]: number[]} = {}
		categoryList.forEach(category => {
			resultObject[category.name] = Array(data.length).fill(0)
		})

		// Loop through the original array and update the result object
		data.forEach((transaction, index) => {
			const categoryName = categoryList.find(category => category.id === transaction.categoryId)?.name || "Other"
			resultObject[categoryName][index] = transaction.amount || 0
		})

		const labels = data.map((transaction: Transaction) => dayjs(transaction.createdAt).format("DD/MM/YYYY"))
		const dataset = Object.keys(resultObject).map((categoryName) => {
			return {
				fill: true,
				label: categoryName,
				data: resultObject[categoryName],
				backgroundColor: "",
				borderColor: "",
			}
		})

		for (let i = 0; i < dataset.length; i++) {
			const element = dataset[i]
			element.borderColor = getAllColors()[i]
			element.backgroundColor = getAllColors()[i] + "50"
		}

		setChartData({
			...chartData,
			labels: labels,
			datasets: dataset,
		})
	}

	const chartOption = {
		responsive: true,
		maintainAspectRatio: false,
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
		labels: [""],
		datasets: [
			{
				fill: true,
				label: "None",
				data: [0],
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			}
		]
	})


	useEffect(() => {
		console.log("TransactionAreaChart Update: ", props)
		updateData(props.data, props.categoryList, props.showIncome)
	}, [props])

	return (
		<Line data={chartData} options={chartOption} />
	)
}

type TransactionAreaChartProps = {
	data: Array<Transaction>
	categoryList: Array<Category>
	showIncome?: boolean
}