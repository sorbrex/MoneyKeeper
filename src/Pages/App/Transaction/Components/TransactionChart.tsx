import React, {useEffect, useState} from "react"
import {Category, NormalizedTransactionForChart, Transaction} from "@/Types/Types"
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
	ScaleChartOptions,
	ChartTypeRegistry, LineControllerChartOptions,
} from "chart.js"
import {getAllColors} from "@UI/Simple/CategoryIcon"
import {_DeepPartialObject} from "chart.js/dist/types/utils"
import dayjs from "dayjs"
import _default from "chart.js/dist/core/core.interaction"
import index = _default.modes.index

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
		const localNormalizedData: NormalizedTransactionForChart = []
		if (!data || data.length === 0) return console.log("No Data")

		//This is the structure of the normalized data
		//{
		//	"date": "01/09/2021",
		//	"Food": [79],
		//	"Health": [210],
		//	"Hobby": [25],
		//	"Home": [100],
		//	"Car": [80]
		//}

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
		const dataset = Object.keys(resultObject).map((key) => {
			return {
				fill: true,
				label: key,
				data: resultObject[key],
				backgroundColor: "",
				borderColor: "",
			}
		})

		for (let i = 0; i < dataset.length; i++) {
			const element = dataset[i]
			element.borderColor = getAllColors()[i]
			element.backgroundColor = getAllColors()[i] + "50"
		}

		console.log("Normalized Data: ", dataset)

		setChartData({
			...chartData,
			labels: labels,
			datasets: dataset

		})
	}

	//const data = props.data.map((tuple) => tuple.category)
	//const labels = props.data.map((tuple) => tuple.date)
	const labels = ["01/09/2021", "02/09/2021", "03/09/2021", "04/09/2021", "05/09/2021", "06/09/2021", "07/09/2021"]
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
		labels: labels,
		datasets: [
			{
				fill: true,
				label: "Casa",
				data: [25, 59, 80, 81, 56, 55, 40],
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
			{
				fill: true,
				label: "Macchina",
				data: [32, 55, 45, 67, 89, 23, 45],
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				fill: true,
				label: "Medicine",
				data: [13, 25, 59, 80, 81, 56, 55],
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgba(75, 192, 192, 0.5)",
			},
			{
				fill: true,
				label: "Passatempi",
				data: [42, 13, 25, 59, 80, 81, 56],
				borderColor: "rgb(255, 205, 86)",
				backgroundColor: "rgba(255, 205, 86, 0.5)",
			}
		]
	})


	useEffect(() => {
		console.log("TransactionAreaChart Update: ", props)
		updateData(props.data, props.categoryList)
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