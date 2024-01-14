import React from "react"

export default function CenteredContainer(props: React.PropsWithChildren) {
	return (
		<div id="Container" className="flex flex-col w-full h-screen justify-center items-center text-center">
			{props.children}
		</div>
	)
}
