import React from "react"
import { Link } from "react-router-dom"

export default function ButtonLink(props: {content:string, icon: React.ReactNode, pageRef?: string}) {
	return (
		<Link className="py-2 px-4 m-1 flex items-start" to={props.pageRef || "/notFound"}>{props.content} {props.icon && props.icon}</Link>
	)
}
