import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


export default function OriginalChartFromDemo()  {
	useLayoutEffect(() => {

		/* Chart code */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		let root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([
			am5themes_Animated.new(root)
		]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
		let chart = root.container.children.push(am5xy.XYChart.new(root, {
			panX: false,
			panY: false,
			wheelX: "panX",
			wheelY: "zoomX",
			paddingLeft: 0,
			layout: root.verticalLayout
		}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
		let legend = chart.children.push(am5.Legend.new(root, {
			centerX: am5.p50,
			x: am5.p50
		}));

		let data = [{
			"year": "2021",
			"europe": 2.5,
			"namerica": 2.5,
			"asia": 2.1,
			"lamerica": 1,
			"meast": 0.8,
			"africa": 0.4
		}, {
			"year": "2022",
			"europe": 2.6,
			"namerica": 2.7,
			"asia": 2.2,
			"lamerica": 0.5,
			"meast": 0.4,
			"africa": 0.3
		}, {
			"year": "2023",
			"europe": 2.8,
			"namerica": 2.9,
			"asia": 2.4,
			"lamerica": 0.3,
			"meast": 0.9,
			"africa": 0.5
		}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		let xRenderer = am5xy.AxisRendererX.new(root, {
			cellStartLocation: 0.1,
			cellEndLocation: 0.9,
			minorGridEnabled: true
		});

		let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
			categoryField: "year",
			renderer: xRenderer,
			tooltip: am5.Tooltip.new(root, {})
		}));

		xRenderer.grid.template.setAll({
			location: 1
		})

		xAxis.data.setAll(data);

		let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			min: 0,
			renderer: am5xy.AxisRendererY.new(root, {
				strokeOpacity: 0.1
			})
		}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		function makeSeries(name: string, fieldName: string, stacked: boolean) {
			let series = chart.series.push(am5xy.ColumnSeries.new(root, {
				stacked: stacked,
				name: name,
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: fieldName,
				categoryXField: "year"
			}));

			series.columns.template.setAll({
				tooltipText: "{name}, {categoryX}:{valueY}",
				width: am5.percent(90),
				tooltipY: am5.percent(10)
			});
			series.data.setAll(data);

			// Make stuff animate on load
			// https://www.amcharts.com/docs/v5/concepts/animations/
			series.appear();

			series.bullets.push(function () {
				return am5.Bullet.new(root, {
					locationY: 0.5,
					sprite: am5.Label.new(root, {
						text: "{valueY}",
						fill: root.interfaceColors.get("alternativeText"),
						centerY: am5.percent(50),
						centerX: am5.percent(50),
						populateText: true
					})
				});
			});

			legend.data.push(series);
		}

		makeSeries("Europe", "europe", false);
		makeSeries("North America", "namerica", true);
		makeSeries("Asia", "asia", false);
		makeSeries("Latin America", "lamerica", true);
		makeSeries("Middle East", "meast", true);
		makeSeries("Africa", "africa", true);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
		chart.appear(1000, 100);

		return () => {
			root.dispose();
		};
	}, []);

	return (
		<div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>
	);
}