import {useLayoutEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {Category, Transaction} from "@/Types/Types";

export default function TransactionChart(props: TransactionChartProps) {

	useLayoutEffect(() => {
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

		// Define Stub Data
		let data = [{
			"year": "2001",
			"cars": 1298,
			"motorcycles": 680,
			"bicycles": 101
		}, {
			"year": "2002",
			"cars": 1275,
			"motorcycles": 664,
			"bicycles": 97
		}, {
			"year": "2003",
			"cars": 1246,
			"motorcycles": 648,
			"bicycles": 93
		}, {
			"year": "2004",
			"cars": 1318,
			"motorcycles": 697,
			"bicycles": 111
		}, {
			"year": "2005",
			"cars": 1213,
			"motorcycles": 633,
			"bicycles": 87
		}, {
			"year": "2006",
			"cars": 1199,
			"motorcycles": 521,
			"bicycles": 145
		}, {
			"year": "2007",
			"cars": 1110,
			"motorcycles": 310,
			"bicycles": 91
		}, {
			"year": "2008",
			"cars": 1165,
			"motorcycles": 425,
			"bicycles": 120
		}, {
			"year": "2009",
			"cars": 1145,
			"motorcycles": 319,
			"bicycles": 102
		}, {
			"year": "2010",
			"cars": 1163,
			"motorcycles": 201,
			"bicycles": 145
		}, {
			"year": "2011",
			"cars": 1180,
			"motorcycles": 285,
			"bicycles": 100
		}, {
			"year": "2012",
			"cars": 1159,
			"motorcycles": 255,
			"bicycles": 122
		}];


		// Create X-Axis (Horizontal Axis)
		let xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: "createdAt", // This Define Which Property of Data is used for Category Axis
				startLocation: 0.5,
				endLocation: 0.5,
				renderer: am5xy.AxisRendererX.new(root, {}),
				tooltip: am5.Tooltip.new(root, {})
			})
		);
		xAxis.data.setAll(data);

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
				categoryXField: "year",
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

			series.data.setAll(data);
			series.appear(1000);
		}

		//Yellow => #FAEDCB | Rose => #F2C6DE | Blue => #C6DEF1 | Green => #C9E4DE | Purple => #DBCDF0 | Orange => #F7D9C4
		// Create Series (Category)
		for(let category of props.categoryList) {
			createSeries(category.name, category.id, "#FAEDCB");
		}
		createSeries("Cars", "cars", "#FAEDCB");
		createSeries("Motorcycles", "motorcycles", "#F2C6DE");
		createSeries("Bicycles", "bicycles", "#C6DEF1");

		return () => {
			root.dispose();
		};
	}, [props.data]);

	return (
		<div id="chartdiv" className="w-full min-h-[400px] mt-4"></div>
	);
}

type TransactionChartProps = {
	data: Transaction[]
	categoryList: Category[]
}