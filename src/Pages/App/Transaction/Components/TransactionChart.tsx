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

function parseDataForAreaChart(transactions: Transaction[], categoryList: Category[]) {
	const chartData = {};
	if (!transactions || transactions.length === 0) return
	transactions.forEach((transaction) => {
		const date = new Date(transaction.createdAt).toLocaleDateString();
		const category = transaction.categoryId;

		if (!chartData[date]) {
			chartData[date] = {};
		}

		if (!chartData[date][category]) {
			chartData[date][category] = 0;
		}

		if (transaction.type === 'expense') {
			chartData[date][category] += transaction.amount;
		}
	});

	const uniqueDates = Array.from(new Set(transactions.map((t) => new Date(t.createdAt).toLocaleDateString())));
	const keys = Object.keys(chartData);
	console.log("Keys: ", keys)
	console.log("chartData: ", chartData)

	keys.map((singleDate) => console.log("Single Date Object: ", chartData[singleDate]))

	// const datasets = Object.keys(chartData).map((date) => ({
	// 	label: category,
	// 	data: chartData[date].map((category) => chartData[date][category]),
	// 	fill: true,
	// 	borderColor: getRandomColor(),
	// 	backgroundColor: 'rgba(75,192,192,0.2)', // You can customize the background color
	// }));

	//
	// console.log("parseDataForAreaChart: ", {
	// 	labels: uniqueDates,
	// 	datasets,
	// })

	// return {
	// 	labels: uniqueDates,
	// 	datasets,
	// };
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}



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
		//updateData(props.data, props.categoryList, props.showIncome)
		const chartData = parseDataForAreaChart(props.data, props.categoryList)
		// setChartData({
		// 	...chartData,
		// 	labels: chartData.labels,
		// 	datasets: chartData.datasets,
		// })
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