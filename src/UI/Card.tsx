import React from "react"
import ButtonPrimary from "./Buttons/ButtonPrimary"

export default function Card(props: CardProps) {
	return (
		<div className="max-w-sm text-pureblack rounded-lg shadow-md m-6">
		
			<img className="rounded-t-lg" src={props.image} alt="" />

			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight">{props.title}</h5>

				<p className="mb-3 font-normal">{props.body}</p>
				
				<ButtonPrimary content={props.buttonText} pageRef={props.buttonRef || "/notFound"}/>
				
			</div>
		</div>
	)
}

type CardProps = {
	image: string,
	title: string,
	body: string,
	buttonText: string,
	buttonRef: string
}