import React from "react"

export default function Container(props:React.PropsWithChildren) {
	return (
		<div id="Container" className="flex flex-col w-full justify-center items-center text-center text-black">
			{props.children}
		</div>
	)
}
