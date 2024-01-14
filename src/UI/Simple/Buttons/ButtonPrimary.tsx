import React from "react"

export default function ButtonPrimary(props: ButtonProps){
	return 	<button className={`px-4 py-2 bg-pureBlack rounded-md text-white hover:bg-softBlack transition-colors duration-300 ease-in-out ${props.className}`} onClick={props.onClick} >{props.content}</button>
}

type ButtonProps = {
	className?: string
	content: string
	onClick: () => void
}