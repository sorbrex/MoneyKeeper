import React from "react"
import type { AlertType } from "@/Types/Types"

export default function Alert(props: AlertProps) {
	const getAlertColor = () => {
		switch (props.type) {
		case "success":
			return "bg-green-500"
		case "error":
			return "bg-red-500"
		case "warning":
			return "bg-yellow-500"
		case "info":
			return "bg-pureBlack"
		default:
			return "bg-blue-500"
		}
	}

	return (
		<>
			<div className={`w-full h-auto flex justify-center items-center transition fade-in duration-700 ${props.visible ? "opacity-100" : "opacity-0"}`}>
				<div className={`w-full ${getAlertColor()} text-sm text-white rounded-md shadow-lg`} role="alert">
					<div className="flex p-4">
						{props.message}
					</div>
				</div>
			</div>
		</>
	)
}

type AlertProps = {
  visible: boolean
  message: string
  type: AlertType
}
