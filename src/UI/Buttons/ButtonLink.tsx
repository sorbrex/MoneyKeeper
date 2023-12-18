import React from "react"
import { Link } from "react-router-dom"

export default function ButtonLink(props: {content:string, pageRef?: string, icon?: React.ReactNode, iconFirst?:boolean, underline?: boolean}) {
	if (props.icon) {
		if (props.iconFirst){
			return <Link className={`py-2 px-4 m-1 flex items-center ${props.underline && "underline"}`} to={props.pageRef || "/notFound"}> {props.icon} {props.content} </Link>
		} else {
			return <Link className={`py-2 px-4 m-1 flex items-center ${props.underline && "underline"}`} to={props.pageRef || "/notFound"}> {props.content} {props.icon} </Link>
		}
	} else {
		return <Link className={`py-2 px-4 m-1 flex items-center ${props.underline && "underline"}`} to={props.pageRef || "/notFound"}>{props.content}</Link>
	}
}
