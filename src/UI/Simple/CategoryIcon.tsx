import React from "react"
import Car from "@Assets/Icons/Car.png"
import Food from "@Assets/Icons/Food.png"
import Health from "@Assets/Icons/Health.png"
import Hobby from "@Assets/Icons/Hobby.png"
import Home from "@Assets/Icons/Home.png"
import Work from "@Assets/Icons/Work.png"
import {Category} from "@/Types/Types"

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
	case "Work":
		return Work

	default:
		return undefined
	}
}

export function parseCategoryIcon (categoryList: Category[], categoryId: string) {
	if (categoryList) {
		const icon: Icon = categoryList.filter((category: Category) => category.id === categoryId)[0]?.name as Icon
		return <CategoryIcon icon={icon} />
	} else {
		return <></>
	}
}

export function getAllColors() {
	return [
		"#F27289",
		"#574144",
		"#BFA5A7",
		"#00B2A3",
		"#007C6F",
		"#A27C2F"
	]
}

export function CategoryIcon(props:{icon: Icon, className?: string}) {
	return (
		<>
			<img src={selectIconToRender(props.icon)} alt={props.icon} className={`h-10 w-10 p-1 rounded ${props.className}`}/>
		</>
	)
}

export type Icon = "Car" | "Food" | "Health" | "Hobby" | "Home" | "Work"