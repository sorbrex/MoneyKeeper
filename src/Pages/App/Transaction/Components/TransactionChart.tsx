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
	function updateData (originalData: Array<Transaction>, categoryList: Array<Category>, showIncome = false) {
		if (!originalData || originalData.length === 0) {
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

		let filteredData: Transaction[]

		//Expense or Income?
		if(showIncome) {
			filteredData = originalData.filter((transaction: Transaction) => transaction.type === "income")
		} else {
			filteredData = originalData.filter((transaction: Transaction) => transaction.type === "expense")
		}

		if (!filteredData || filteredData.length === 0) return

		const parsedData: {[key: string]:{[key: string]:number}} = {};

		filteredData.reverse().forEach((singleTransaction) => {
			const date = new Date(singleTransaction.createdAt).toLocaleDateString();
			const categoryId = singleTransaction.categoryId;

			if (!parsedData[date]) {
				parsedData[date] = {};
			}

			if (!parsedData[date][categoryId]) {
				parsedData[date][categoryId] = 0;
			}

			if (singleTransaction.amount) {
				parsedData[date][categoryId] += singleTransaction.amount;
			}
		});

		const uniqueDates = Object.keys(parsedData)

		// Ensure each category has a value for every date
		categoryList.forEach((categoryObject) => {
			uniqueDates.forEach((date) => {
				if (!parsedData[date][categoryObject.id]) {
					parsedData[date][categoryObject.id] = 0;
				}
			});
		});


		const datasets = categoryList.map((categoryObject) => ({
			label: categoryObject.name,
			data: uniqueDates.map((date) => parsedData[date]?.[categoryObject.id] || 0),
			fill: true,
			backgroundColor: "",
			borderColor: "",
		}));

		for (let i = 0; i < datasets.length; i++) {
			const element = datasets[i]
			element.backgroundColor = getAllColors()[i] + "50"
			element.borderColor = getAllColors()[i]
		}

		setChartData({
			...chartData,
			labels: uniqueDates,
			datasets: datasets,
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