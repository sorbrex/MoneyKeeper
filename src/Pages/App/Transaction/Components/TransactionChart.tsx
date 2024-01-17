import {useLayoutEffect} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {Category, NormalizedTransactionForChart} from "@/Types/Types";
import {Icon, retrieveColorForIcon} from "@UI/Simple/CategoryIcon";

export default function TransactionChart(props: TransactionChartProps) {

	useLayoutEffect(() => {// Create Root Element
		let root = am5.Root.new("chartdiv");
		root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

		// Create chart with option to move and resize the chart
		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: "panX",
				wheelY: "zoomX",
				pinchZoomX: true
			})
		);

		let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
			behavior: "none"
		}));
		cursor.lineY.set("visible", false);

		// Create X-Axis (Horizontal Axis)
		let xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: "date", // This Define Which Property of Data is used for Category Axis
				startLocation: 0.5,
				endLocation: 0.5,
				renderer: am5xy.AxisRendererX.new(root, {}),
				tooltip: am5.Tooltip.new(root, {})
			})
		);
		xAxis.data.setAll(props.data);

		// Create Y-Axis (Vertical Axis)
		let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {})
		}));

		// Create Series Function To Call For Each Series (Category I Guess)
		function createSeries(name: string, field: string, color: string) {
			let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
				name: name,
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: field, // This Define Which Property of Data is used for Value Axis
				categoryXField: "date",
				stacked: true,
				stroke: am5.color(0xffffff),
				tooltip: am5.Tooltip.new(root, {
					pointerOrientation: "horizontal",
					labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
				})
			}));

			series.strokes.template.setAll({
				strokeWidth: 4,
				strokeOpacity: 1,
				shadowBlur: 2,
				shadowOffsetX: 2,
				shadowOffsetY: 2,
				shadowColor: am5.color(0x000000),
				shadowOpacity: 0.1
			})

			series.fills.template.setAll({
				fillOpacity: 1,
				visible: true,

				fillPattern: am5.GrainPattern.new(root, {
					maxOpacity: 0.15,
					density: 0.5,
					colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)]
				})

			});

			series.set("fill", am5.color(color))

			series.data.setAll(props.data);
			series.appear(1000);
		}

		// Create Series (Category)
		for(let category of props.categoryList) {
			createSeries(category.name, category.id, retrieveColorForIcon(category.name as Icon))
		}

		return () => {
			root.dispose();
		};
	}, [props]);

	return (
		<div id="chartdiv" className="w-full min-h-[100px] md:min-h-[400px] mt-4"></div>
	);
}

type TransactionChartProps = {
	data: NormalizedTransactionForChart,
	categoryList: Category[]
	type?: "expense" | "income"
}