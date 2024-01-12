import React from "react"

export default function BaseButton(props: ButtonProps){
	return 	<button className={`px-4 py-2 rounded-md bg-pageGray text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ease-in-out ${props.className}`} onClick={props.onClick} >{props.content}</button>
}

type ButtonProps = {
	className?: string
	content: string
	onClick: () => void
}