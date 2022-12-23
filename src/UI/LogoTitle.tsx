import React from "react"
import Logo from "@Assets/Logo_Black.png"

export default function LogoTitle() {
	return (
		<div className="w-full h-auto flex justify-center items-center mb-3">
			<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
		</div>
	)
}