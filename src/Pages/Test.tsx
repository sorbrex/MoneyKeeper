import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import TransactionChart from "@Pages/App/Transaction/Components/TransactionChart"

const stubData = [
	{
		"date": "2021-09-01",
		"category": "Food",
		"amount": 79
	},
	{
		"date": "2021-09-01",
		"category": "Health",
		"amount": 210
	},
	{
		"date": "2021-09-01",
		"category": "Hobby",
		"amount": 25
	},
	{
		"date": "2021-09-02",
		"category": "Home",
		"amount": 24
	},
	{
		"date": "2021-09-02",
		"category": "Car",
		"amount": 137
	}
]


//Every Category is a Dataset and Everyt Day is a Label and the Amount is the Value

export default function Test() {
	return (
		<>
			<section id="ChartJS_BarChart" className="flex flex-col bg-white text-black">
				<CenteredContainer>
					<TransactionChart data={stubData}/>
				</CenteredContainer>
			</section>
		</>
	)
}
