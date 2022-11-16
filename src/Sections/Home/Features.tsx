import React from "react"
import Title from "@UI/Typography/Title"
import Categories from "@Assets/Categorie.png"
import Card from "@/UI/Card"

export default function Features() {
	return (
		<>
			<div id="Description__Content" className="flex flex-col w-full justify-center items-center text-center text-black bg-pageGray pt-10">

				<Title title="Features" underline={true} />

				<div className="container mx-auto flex flex-wrap p-8">

					<div className="w-full md:w-1/3 p-6 flex flex-row justify-center flex-wrap flex-grow flex-shrink">
						<Card 
							image={Categories} 
							title={"Sasageyo"} 
							body={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."} 
							buttonText={"Explore"}
							buttonRef={"/features"}
						/>
						<Card 
							image={Categories} 
							title={"Sasageyo"} 
							body={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."} 
							buttonText={"Explore"}
							buttonRef={"/features"}
						/>
						<Card 
							image={Categories} 
							title={"Sasageyo"} 
							body={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."} 
							buttonText={"Explore"}
							buttonRef={"/features"}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
