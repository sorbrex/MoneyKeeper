import React, {useLayoutEffect, useRef} from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import {Category, NormalizedTransactionForChart} from "@/Types/Types"
import {Icon, retrieveColorForIcon} from "@UI/Simple/CategoryIcon"
import {color, Root} from "@amcharts/amcharts5"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

export default function ClusteredChart(props: ClusteredChartProps) {
	const chartRef = useRef<any>()

	useLayoutEffect(() => {
		am5.ready(() => {
			if (chartRef.current) {
				chartRef.current.dispose()
			}
			const root =  am5.Root.new(props.chartId)

			root.setThemes([
				am5themes_Animated.new(root),
				am5themes_Responsive.new(root)
			])

			const chart = root.container.children.push(am5xy.XYChart.new(root, {
				panX: true,
				panY: false,
				wheelX: "panX",
				wheelY: "zoomX"
			}))

			const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {})
			}))

			const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
				categoryField: "date",
				startLocation: 0,
				endLocation: 1,
				renderer: am5xy.AxisRendererX.new(root, {
					minorGridEnabled: true
				}),
				tooltip: am5.Tooltip.new(root, {})
			}))
			xAxis.data.setAll(props.data)

			function makeSeries(name: string, fieldName: string, stacked: boolean) {
				const series = chart.series.push(am5xy.ColumnSeries.new(root as Root, {
					name: name,
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: fieldName,
					categoryXField: "date",
					stacked: stacked,
					fill: color(retrieveColorForIcon(name as Icon)),
				}))

				series.columns.template.setAll({
					tooltipText: "[bold]{name}[/], {categoryX}: \n{valueY}€",
					width: am5.percent(90),
					tooltipY: am5.percent(10)
				})

				series.data.setAll(props.data)
				series.appear(1000)
			}

			console.log("Received Data: ", props.data)
			const allUniqueSeries = new Set<string>()

			const allIndexes = Object.keys(props.data)
			// First we loop for each date
			for (const index of allIndexes) {
				const allTransactionIds = Object.keys(props.data[index as unknown as number]).filter((transactionId: string) => transactionId.includes("expense_") || transactionId.includes("income_"))
				allTransactionIds.forEach((transactionId: string) => {
					if (!allUniqueSeries.has(transactionId)){
						console.log("TransactionId: ", transactionId)
						allUniqueSeries.add(transactionId)
					}
				})
			}

			let isFirstIncome = true
			let isFirstExpense = true

			allUniqueSeries.forEach((transactionId: string) => {
				const categoryName = props.categoryList.find((category: Category) =>
					category.id === transactionId.replace("income_","").replace("expense_","")
				)?.name as string

				if (transactionId.includes("income_") && isFirstIncome) {
					makeSeries(categoryName, transactionId, false)
					isFirstIncome = false
				}
				if (transactionId.includes("expense_") && isFirstExpense) {
					makeSeries(categoryName, transactionId, false)
					isFirstExpense = false
				}
				makeSeries(categoryName, transactionId, true)
			})

			chartRef.current = chart

			return () => {
				am5.disposeAllRootElements()
			}
		})
	}, [])

	useLayoutEffect(() => {
		chartRef.current.setAll(props.data)
	}, [props.data])


	return (
		<div id={props.chartId} className="w-full min-h-[400px]"/>
	)
}


type ClusteredChartProps = {
	data: NormalizedTransactionForChart,
	categoryList: Category[],
	chartId: string
}