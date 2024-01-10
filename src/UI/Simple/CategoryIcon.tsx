import React from "react"
import Car from "@Assets/Icons/Car.png"
import Food from "@Assets/Icons/Food.png"
import Health from "@Assets/Icons/Health.png"
import Hobby from "@Assets/Icons/Hobby.png"
import Home from "@Assets/Icons/Home.png"
import {Simulate} from "react-dom/test-utils"
import select = Simulate.select


function selectIconToRender(iconName: Icon) {
	switch(iconName) {
	case "Car":
		return Car
	case "Food":
		return Food
	case "Health":
		return Health
	case "Hobby":
		return Hobby
	case "Home":
		return Home

	default:
		return undefined
	}
}

export default function CategoryIcon(props:{icon: Icon, selected?: boolean}) {
	return (
		<>
			<div className="rounded flex-row shadow-lg text-black">
				<img src={selectIconToRender(props.icon)} alt={props.icon} className={`h-10 w-10 p-1 rounded ${props.selected && "border-solid border-2 border-faceBlue"}`}/>
			</div>
		</>
	)
}

type Icon = "Car" | "Food" | "Health" | "Hobby" | "Home"