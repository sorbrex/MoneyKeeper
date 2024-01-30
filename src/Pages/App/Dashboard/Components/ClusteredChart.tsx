import React, {useEffect, useRef, useState} from "react"
import {Category, CategoryWithAmount, NormalizedTransactionForChart} from "@/Types/Types"
import {getAllColors} from "@UI/Simple/CategoryIcon"
import {Doughnut} from "react-chartjs-2"

export default function ClusteredChart(props: ClusteredChartProps) {
	const chartRef = useRef<any>()
	const data = props.data.map((category: CategoryWithAmount) => category.amount)
	const labels = props.data.map((tuple: CategoryWithAmount) => tuple.category)

	const chartOption = {
		responsive: true,
		maintainAspectRatio: false,
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

	return(<></>)
}

type ClusteredChartProps = {
	data: CategoryWithAmount[]
}