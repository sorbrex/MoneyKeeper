import React from "react"

export default function Title({title, underline}:TitleProps) {
	return (
		<>
			<h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
				{title}
			</h2>

			{underline && 
				<div className="w-full mb-6 p-1">
					<div className="h-1 mx-auto w-64 my-0 py-0 rounded-t bg-gradient-to-br from-faceBlue to-white"></div>
				</div>
			}
			
		</>
	)
}

interface TitleProps {
	title: string
	underline?: boolean
}