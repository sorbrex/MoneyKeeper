import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {useLayoutEffect, useRef} from "react";
import {Category, NormalizedCategoryForChart} from "@/Types/Types";
import {Root} from "@amcharts/amcharts5";

export default function CategoryPieChart(props: CategoryPieChartProps){
	const root = useRef<Root>()

	useLayoutEffect(() => {
		if (!props.data) return;

		if (!root.current) root.current = am5.Root.new(props.chartId);

		root.current.setThemes([
			am5themes_Animated.new(root.current)
		]);

		let chart = root.current.container.children.push(
			am5percent.PieChart.new(root.current, {
				layout: root.current.verticalLayout,
				innerRadius: am5.percent(50)
			})
		);

		let series = chart.series.push(am5percent.PieSeries.new(root.current, {
			valueField: "amount",
			categoryField: "category",
			alignLabels: false
		}));

		series.labels.template.setAll({
			textType: "circular",
			centerX: 0,
			centerY: 0
		});

		series.slices.template.setAll({
			fillOpacity: 0.5,
			stroke: am5.color(0xffffff),
			strokeWidth: 2
		});

		series.data.setAll(props.data as unknown[]);

		let legend = chart.children.push(am5.Legend.new(root.current, {
			centerX: am5.percent(50),
			x: am5.percent(50),
			marginTop: 15,
			marginBottom: 15,
		}));

		legend.data.setAll(series.dataItems);

		series.appear(1000, 100);


		return () => {
			root.current?.dispose();
		};
	}, []);

	return (
		<div id={props.chartId} style={{ width: "500px", height: "500px" }}></div>
	);
}

type CategoryPieChartProps = {
	data?: NormalizedCategoryForChart
	chartId: string
	categoryList: Category[]
}