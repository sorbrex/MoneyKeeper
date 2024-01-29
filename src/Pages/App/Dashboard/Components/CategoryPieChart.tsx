import React, {useEffect, useState} from "react"
import { CategoryWithAmount } from "@/Types/Types"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { getAllColors } from "@UI/Simple/CategoryIcon"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CategoryPieChart(props: PieChartProps) {
	const data = props.data.map((category: CategoryWithAmount) => category.amount)
	const labels = props.data.map((tuple: CategoryWithAmount) => tuple.category)
	const chartOptions = {
		responsive: true,
		title: {
			display: true,
			text: "Chart.js Line Chart - Cubic interpolation mode"
		}
	}

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
				hoverOffset: 4
			}
		]
	})

	useEffect(() => {
		const data = props.data.map((category: CategoryWithAmount) => category.amount)

		setChartData({
			...chartData,
			datasets: [
				{
					...chartData.datasets[0],
					data: data
				}
			]
		})
	}, [props.data])

	return <Doughnut  data={chartData} options={chartOptions} />
}

type PieChartProps = {
	data: CategoryWithAmount[]
}