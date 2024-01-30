import React, {useEffect, useState} from "react"
import {
	Category,
	CategoryWithAmount,
	NormalizedCategoryForChart,
	Transaction
} from "@/Types/Types"
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
} from "chart.js"
import "chart.js/auto" // ADD THIS
import {Doughnut} from "react-chartjs-2"
import { getAllColors } from "@UI/Simple/CategoryIcon"
import {_DeepPartialObject} from "chart.js/dist/types/utils"

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

export default function CategoryPieChart(props: PieChartProps) {
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
			}
		},
	} as _DeepPartialObject<CoreChartOptions<"doughnut"> & ElementChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & DoughnutControllerChartOptions>
	const [chartData, setChartData] = useState({
		type: "doughnut",
		labels: ["None"],
		datasets: [
			{
				label: "Amount: ",
				data: [1],
				backgroundColor: getAllColors(),
				borderColor: "#fff",
				borderWidth: 1,
				padding: 10,
				hoverOffset: 8
			}
		]
	})

	function updateChartData (transactionList: Transaction[], categoryList: Category[]) {
		if (!transactionList || transactionList.length <= 0) {
			setChartData({
				...chartData,
				labels: ["None"] as never[],
				datasets: [
					{
						...chartData.datasets[0],
						data: [1] as never[]
					}
				]
			})
			return
		}

		const filteredTransactionList = transactionList.filter((transaction: Transaction) => {
			return transaction.type !== "income"
		})

		const categoryTotals = {}

		filteredTransactionList.forEach(transaction => {
			const categoryName = categoryList.find((category: Category) => category.id === transaction.categoryId)?.name || "Expense"

			if (Object.hasOwn(categoryTotals, categoryName)) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				categoryTotals[categoryName] += transaction.amount
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				categoryTotals[categoryName] = transaction.amount
			}
		})

		const localNormalizedData: NormalizedCategoryForChart = Object.entries(categoryTotals).map(([categoryName, totalAmount])=> ({
			category: categoryName,
			amount : totalAmount as number
		}))

		setChartData({
			...chartData,
			labels: localNormalizedData.map((category: CategoryWithAmount) => category.category) as never[],
			datasets: [
				{
					...chartData.datasets[0],
					data: localNormalizedData.map((category: CategoryWithAmount) => category.amount) as never[]
				}
			]
		})
	}

	useEffect(() => {
		updateChartData(props.data, props.categoryList)
	}, [props])

	return(
		<Doughnut data={chartData} options={chartOption}/>
	)
}

type PieChartProps = {
	data: Transaction[]
	categoryList: Category[]
}