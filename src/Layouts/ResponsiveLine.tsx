import React from "react"

export default function ResponsiveLine(props: ResponsiveLineProps) {
	return (
		<>
			<div id="ResponsiveLine" className={`flex flex-wrap justify-around ${props.reversed ? "flex-row-reverse" : "flex-row"} mx-4 ${props.custom || ""}`}>

				<div id="Line_Paragraph" className="w-full text-left px-8 md:w-2/5 md:p-4">
					<h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">{props.title}</h3>
					<p className="text-gray-600 mb-8">{props.text}</p>
				</div>

				<div id="Line_Image" className="w-full p-6 md:w-1/2">
					<img src={props.imgSource} className="h-2/3" alt={props.imgSource.split("/").slice(-1)[0]} />
				</div>
				
			</div>
		</>
	)
}

type ResponsiveLineProps = {
	imgSource:string,
	title:string,
	text:string,
	reversed?:boolean
	custom?:string
}