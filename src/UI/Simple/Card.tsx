import React from "react"
import ButtonSecondary from "@UI/Simple/Buttons/ButtonSecondary"

export default function Card(props: CardProps) {
	return (
		<div className="max-w-sm text-pureBlack rounded-lg shadow-md m-6">
		
			<img className="rounded-t-lg" src={props.image} alt="" />

			<div className="p-6">
				<h5 className="m-3 text-2xl font-bold tracking-tight">{props.title}</h5>			
				<p className="font-normal">{props.body}</p>

				{(props.buttonText && props.buttonRef) && <ButtonSecondary content={props.buttonText || "..."} pageRef={props.buttonRef || "/notFound"}/>}
				

			</div>

		</div>
	)
}

type CardProps = {
	image: string,
	title: string,
	body: string,
	buttonText?: string,
	buttonRef?: string
}