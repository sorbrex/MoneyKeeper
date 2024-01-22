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


export function retrieveColorForIcon(iconName: Icon) {
	//Yellow => #FAEDCB | Rose => #F2C6DE | Blue => #C6DEF1 | Green => #C9E4DE | Purple => #DBCDF0 | Orange => #F7D9C4
	switch(iconName) {
	case "Car":
		return "#F99A26" //"#DBCDF0"
	case "Food":
		return "#0E0091" //"#C9E4DE"
	case "Health":
		return "#E5446D" //"#F2C6DE"
	case "Hobby":
		return "#A288A6" //"#FAEDCB"
	case "Home":
		return "#4ECDC4" //"#C6DEF1"
	case "Work":
		return "#DDC3D0"//"#F7D9C4"

	default:
		return "#000000"
	}
}

export default function CategoryIcon(props:{icon: Icon, className?: string}) {
	return (
		<>
			<img src={selectIconToRender(props.icon)} alt={props.icon} className={`h-10 w-10 p-1 rounded ${props.className}`}/>
		</>
	)
}

export type Icon = "Car" | "Food" | "Health" | "Hobby" | "Home" | "Work"