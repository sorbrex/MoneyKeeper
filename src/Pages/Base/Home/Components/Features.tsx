import React from "react"
import Title from "@UI/Simple/Typography/Title"
import Categories from "@Assets/Categories.png"
import Charts from "@Assets/Charts.png"
import History from "@Assets/History.png"
import Card from "@UI/Simple/Card"

export default function Features() {
	return (
		<>
			<div id="Description__Content" className="flex flex-col w-full justify-center items-center text-center text-black bg-pageGray pt-10">

				<Title title="Features" underline={true} />

				<div className="container mx-auto flex flex-wrap p-8">

					<div className="w-full md:w-1/3 p-6 flex flex-row justify-center flex-wrap flex-grow flex-shrink">
						<Card 
							image={Categories}
							title={"Categories"}
							body={"Observe all the transactions divided by categories, so as to understand which ones are the ones where the most money is spent."}
						/>
						<Card 
							image={Charts}
							title={"Charts"}
							body={"Use our charts to better compare the types of transitions and immediately highlight the most expensive ones."}
						/>
						<Card 
							image={History}
							title={"History"}
							body={"Always keep track of your transactions and view the history to securely remember every incoming or outgoing amount."}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
