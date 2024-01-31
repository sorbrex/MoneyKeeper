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

		const expenseList = data.filter(transaction => transaction.type === "expense")
		const incomeList = data.filter(transaction => transaction.type === "income")
		const labels = data.map((transaction: Transaction) => dayjs(transaction.createdAt).format("DD/MM/YYYY"))

		// Initialize the final object with arrays of zeros for each type of transaction
		const resultObject: {[key: string]: {[key: string]: number[]}} = {
			"expense": {},
			"income": {}
		}

		categoryList.forEach(category => {
			resultObject['expense'][category.name] = Array(labels.length).fill(0)
			resultObject['income'][category.name] = Array(labels.length).fill(0)
		})

		// Loop through the original array and update the result object
		expenseList.forEach((transaction, index) => {
			const categoryName = categoryList.find(category => category.id === transaction.categoryId)?.name || "Other"
			resultObject['expense'][categoryName][index] = transaction.amount || 0
		})

		incomeList.forEach((transaction, index) => {
			const categoryName = categoryList.find(category => category.id === transaction.categoryId)?.name || "Other"
			resultObject['income'][categoryName][index] = transaction.amount || 0
		})

		console.log("Result Object: ", resultObject)
		const expenseDataset = Object.keys(resultObject['expense']).map((categoryName) => {
			return {
				fill: true,
				label: categoryName + " (Expense)",
				data: resultObject['expense'][categoryName],
				backgroundColor: "",
				stack: "Expense"
			}
		})
		const incomeDataset = Object.keys(resultObject['income']).map((categoryName) => {
			return {
				fill: true,
				label: categoryName + " (Income)",
				data: resultObject['income'][categoryName],
				backgroundColor: "",
				stack: "Income"
			}
		})

		for (let i = 0; i < expenseDataset.length; i++) {
			const element = expenseDataset[i]
			element.backgroundColor = getAllColors()[i]
		}

		for (let i = 0; i < incomeDataset.length; i++) {
			const element = incomeDataset[i]
			element.backgroundColor = getAllColors()[i]
		}
		const finalDataset = []
		finalDataset.push(expenseDataset)
		finalDataset.push(incomeDataset)
		setChartData({
			...chartData,
			labels: labels,
			datasets: finalDataset.flat(),
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