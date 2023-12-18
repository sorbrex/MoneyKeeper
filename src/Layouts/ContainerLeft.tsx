import React from "react"

export default function ContainerLeft(props:React.PropsWithChildren) {
	return (
		<div id="Container" className="flex flex-col w-full justify-start items-start text-left text-black">
			{props.children}
		</div>
	)
}
