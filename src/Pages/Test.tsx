import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Title from "@UI/Simple/Typography/Title"
import {CategoryWithAmount} from "@/Types/Types"
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Chart} from "chart.js"
import CategoryPieChart from "@Pages/App/Dashboard/Components/CategoryPieChart"
ChartJS.register(ArcElement, Tooltip, Legend)

const stubData: CategoryWithAmount[] = [
	{
		"category": "Food",
		"amount": 79
	},
	{
		"category": "Health",
		"amount": 210
	},
	{
		"category": "Hobby",
		"amount": 25
	},
	{
		"category": "Home",
		"amount": 24
	},
	{
		"category": "Car",
		"amount": 137
	}
]


export default function Test() {
	return (
		<>
			<section id="ChartJS_BarChart" className="flex flex-col bg-white text-black">
				<CenteredContainer>
					<Title title="ChartJS Bar Chart" />
					{/*<OriginalPieFromLibrary data={stubData} />*/}
				</CenteredContainer>
			</section>
		</>
	)
}


function OriginalPieFromLibrary(props:{data:CategoryWithAmount[]}){


}