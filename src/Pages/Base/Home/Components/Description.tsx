import React from "react"
import Savings from "@Assets/Savings.png"
import Dashboard from "@Assets/Dashboard.png"
import HeaderTitle from "@UI/Simple/Typography/Title"
import ResponsiveLine from "@/Layouts/ResponsiveLine"

export default function DescriptionSection() {
	return (
		<>
			<div id="Description__Content" className="flex flex-col w-full justify-center items-center text-center text-black">
				<HeaderTitle title="Savings" underline={true} />

				<div className="container max-w-5xl mx-auto m-10">

					<ResponsiveLine 
						imgSource={Savings} 
						title={" Save For Your Future "} 
						text={"Check your expenses, find out where you can start saving and start keeping a little treasure to treat yourself to new experiences."} 
						reversed={false}
					/>

					<ResponsiveLine 
						imgSource={Dashboard} 
						title={" Choose Based On Personalized Data "} 
						text={"Keep track of all your transactions with our intuitive and easy to use Dashboard Interface"} 
						reversed={true}
					/>

				</div>

			</div>
		</>
	)
}
