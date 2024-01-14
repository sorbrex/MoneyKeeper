import React from "react"
import { Link } from "react-router-dom"

export default function ButtonSecondary(props: {content:string, icon?: React.ReactNode, pageRef?: string}) {
	return (
		props.pageRef ? 
			<Link className="py-2 px-4 flex place-content-center btn bg-faceBlue" to={props.pageRef || "/notFound" }>{props.content}{props.icon && props.icon}</Link>
			:
			<button className="py-2 px-4 flex place-content-center btn bg-faceBlue">{props.content}{props.icon && props.icon}</button>
	)
}
