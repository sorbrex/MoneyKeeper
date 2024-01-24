import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Category, NormalizedTransactionForChart} from "@/Types/Types";
import {Icon, retrieveColorForIcon} from "@UI/Simple/CategoryIcon";
import {color} from "@amcharts/amcharts5";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function ClusteredChart(props: ClusteredChartProps) {
	useLayoutEffect(() => {
		const normalizedData = props.data

		let root = am5.Root.new("chartdiv");
		root.setThemes([
			am5themes_Animated.new(root),
			am5themes_Responsive.new(root)
		]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: false,
				wheelX: "panX",
				wheelY: "zoomX"
			}));

		let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
			categoryField: "date",
			startLocation: 0,
			endLocation: 1,
			renderer: am5xy.AxisRendererX.new(root, {
				minorGridEnabled: true
			}),
			tooltip: am5.Tooltip.new(root, {})
		}));
		xAxis.data.setAll(normalizedData);

		let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {})
		}));

		function makeSeries(name: string, fieldName: string, stacked: boolean) {
			let series = chart.series.push(am5xy.ColumnSeries.new(root, {
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

			series.data.setAll(normalizedData);
			series.appear(1000);
		}

		const allIndexes = Object.keys(normalizedData)
		console.log(`Total Of Day To Display: ${allIndexes.length}\n\n`)
		// First we loop for each date
		for (let index of allIndexes) {
			console.log(`Creating series for Date => ${normalizedData[index as unknown as number].date}`)
			// Now we loop for each transactionId (expense_ or income_) of the date. All TransactionIds match a category
			const allTransactionIds = Object.keys(normalizedData[index as unknown as number])
			const allExpenseIds = allTransactionIds.filter((transactionId: string) => transactionId.includes("expense_"))
			const allIncomeIds = allTransactionIds.filter((transactionId: string) => transactionId.includes("income_"))

			if(allExpenseIds.length > 0) {
				const firstExpenseId = allExpenseIds.pop() as string
				const firstExpenseName = props.categoryList.find((category: Category) => category.id === firstExpenseId?.split("_")[1])?.name || "Expense"
				makeSeries(firstExpenseName, firstExpenseId, false)
				for (let expenseId of allExpenseIds) {
					const categoryId = expenseId.split("_")[1]
					const categoryName = props.categoryList.find((category: Category) => category.id === categoryId)?.name || "Expense"
					makeSeries(categoryName, expenseId, true)
				}
			}

			if(allIncomeIds.length > 0) {
				const firstIncomeId = allIncomeIds.pop() as string
				const firstIncomeName = props.categoryList.find((category: Category) => category.id === firstIncomeId?.split("_")[1])?.name || "Income"
				makeSeries(firstIncomeName, firstIncomeId, false)
				for (let incomeId of allIncomeIds) {
					const categoryId = incomeId.split("_")[1]
					const categoryName = props.categoryList.find((category: Category) => category.id === categoryId)?.name || "Income"
					makeSeries(categoryName, incomeId, true)
				}
			}

			break
		}

		return () => {
			root.dispose();
		};
	}, [props.data]);

	return (
		<div id="chartdiv" className="w-full min-h-[400px]"></div>
	);
}


type ClusteredChartProps = {
	data: NormalizedTransactionForChart,
	categoryList: Category[]
}