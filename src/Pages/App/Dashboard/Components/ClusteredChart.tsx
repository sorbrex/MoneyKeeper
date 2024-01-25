import {useLayoutEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Category} from "@/Types/Types";
import {Icon, retrieveColorForIcon} from "@UI/Simple/CategoryIcon";
import {color, Root} from "@amcharts/amcharts5";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function ClusteredChart(props: ClusteredChartProps) {
	const root = useRef<Root>()

	useLayoutEffect(() => {
		if (!props.data) return;

		if (!root.current) root.current = am5.Root.new(props.chartId);

		root.current.setThemes([
			am5themes_Animated.new(root.current),
			am5themes_Responsive.new(root.current)
		]);

		const chart = root.current.container.children.push(
			am5xy.XYChart.new(root.current, {
				panX: true,
				panY: false,
				wheelX: "panX",
				wheelY: "zoomX"
			})
		);

		const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root.current, {
			categoryField: "date",
			startLocation: 0,
			endLocation: 1,
			renderer: am5xy.AxisRendererX.new(root.current, {
				minorGridEnabled: true
			}),
			tooltip: am5.Tooltip.new(root.current, {})
		}));
		xAxis.data.setAll(props.data);

		const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root.current, {
			renderer: am5xy.AxisRendererY.new(root.current, {})
		}));

		function makeSeries(name: string, fieldName: string, stacked: boolean) {
			const series = chart.series.push(am5xy.ColumnSeries.new(root.current as Root, {
				name: name,
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: fieldName,
				categoryXField: "date",
				stacked: stacked,
				fill: color(retrieveColorForIcon(name as Icon)),
			}));

			series.columns.template.setAll({
				tooltipText: "[bold]{name}[/], {categoryX}: \n{valueY}€",
				width: am5.percent(90),
				tooltipY: am5.percent(10)
			});

			series.data.setAll(props.data);
			series.appear(1000);
		}


		console.log("Received Data: ", props.data)

		const allIndexes = Object.keys(props.data)
		// First we loop for each date
		for (let index of allIndexes) {
			console.log(`\n\n\nCreating series for Date => ${props.data[index as unknown as number].date}`)
			console.log("Looping Object: ",props.data[index as unknown as number])
			// Now we loop for each transactionId (expense_ or income_) of the date. All TransactionIds match a category
			const allTransactionIds = Object.keys(props.data[index as unknown as number])
			const allExpenseIds = allTransactionIds.filter((transactionId: string) => transactionId.includes("expense_"))
			const allIncomeIds = allTransactionIds.filter((transactionId: string) => transactionId.includes("income_"))

			if(allExpenseIds.length > 0) {
				const firstExpenseId = allExpenseIds.pop() as string
				const firstExpenseName = props.categoryList.find((category: Category) => category.id === firstExpenseId?.split("_")[1])?.name || "Expense"
				console.log("First Expense: ", firstExpenseId)
				makeSeries(firstExpenseName, firstExpenseId, false)
				for (let expenseId of allExpenseIds) {
					console.log("Creating Expense: ", expenseId)
					const categoryId = expenseId.split("_")[1]
					const categoryName = props.categoryList.find((category: Category) => category.id === categoryId)?.name || "Expense"
					makeSeries(categoryName, expenseId, true)
				}
			}

			if(allIncomeIds.length > 0) {
				const firstIncomeId = allIncomeIds.pop() as string
				const firstIncomeName = props.categoryList.find((category: Category) => category.id === firstIncomeId?.split("_")[1])?.name || "Income"
				console.log("First Income: ", firstIncomeId)
				makeSeries(firstIncomeName, firstIncomeId, false)
				for (let incomeId of allIncomeIds) {
					console.log("Creating Income: ", incomeId)
					const categoryId = incomeId.split("_")[1]
					const categoryName = props.categoryList.find((category: Category) => category.id === categoryId)?.name || "Income"
					makeSeries(categoryName, incomeId, true)
				}
			}

		}

		return () => root.current?.dispose();
	}, [props.data]);

	return (
		<div id={props.chartId} className="w-full min-h-[400px]"></div>
	);
}


type ClusteredChartProps = {
	data: any,
	categoryList: Category[],
	chartId: string
}