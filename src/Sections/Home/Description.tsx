import React from "react"
import Savings from "../../assets/Savings.png"
import Dashboard from "../../assets/Dashboard.png"
import HeaderTitle from "../../UI/Typography/Title"
export default function DescriptionSection() {
	return (
		<>
			<div id="Description__Content" className="flex flex-col w-full justify-center items-center text-center text-black">
				<HeaderTitle title="Savings" underline={true} />

				<div className="container max-w-5xl mx-auto m-10">

					<div className="flex flex-wrap justify-around mx-4">
						<div id="Message" className="w-full text-left mx-8 md:w-2/5 md:m-4">
							<h3 className="text-3xl text-gray-800 font-bold leading-none mb-3"> Save For Your Future </h3>
							<p className="text-gray-600 mb-8">
									Check your expenses, find out where you can start saving and start keeping a little treasure to treat yourself to new experiences.
							</p>
						</div>

						<div id="Image" className="w-full p-6 md:w-1/2">
							<img src={Savings} alt="Savings" />
						</div>
					</div>

					<div className="flex flex-wrap justify-around flex-row-reverse mx-4">
						<div id="Message" className="w-full text-left mx-8 md:w-2/5 md:m-4">
							<h3 className="text-3xl text-gray-800 font-bold leading-none mb-3"> Choose Based On Personalized Data </h3>
							<p className="text-gray-600 mb-8">Keep track of all your transactions with our intuitive and easy to use Dashboard Interface</p>
						</div>

						<div id="Image" className="w-full p-6 md:w-1/2">
							<img src={Dashboard} alt="Savings" />
						</div>
					</div>

				</div>

			</div>
		</>
	)
}
