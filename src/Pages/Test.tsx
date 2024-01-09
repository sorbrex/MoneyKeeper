import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import CategoryIcon from "@UI/Simple/CategoryIcon";
import Car from "@Assets/Icons/Car.png"
import Food from "@Assets/Icons/Food.png"
import Health from "@Assets/Icons/Health.png"
import Hobby from "@Assets/Icons/Hobby.png"
import Home from "@Assets/Icons/Home.png"


export default function Test() {
	return (
		<>
			<section id="Test_Page" className="h-screen flex flex-col">

				<CenteredContainer>
					<h1 className="text-4xl font-bold">Test Page</h1>
					<div className="flex flex-row gap-2">
						<CategoryIcon name="Test" source={Home} color="#87d1ff"/>
						<CategoryIcon name="Test" source={Food} color="#ff88ff"/>
						<CategoryIcon name="Test" source={Car} color="green"/>
						<CategoryIcon name="Test" source={Hobby} color="yellow"/>
						<CategoryIcon name="Test" source={Health} color="purple"/>
					</div>
				</CenteredContainer>

			</section>
		</>
	)
}
