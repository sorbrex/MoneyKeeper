import React from "react"

export default function CategoryIcon(props:{name:string, source:string, color:string}) {
	return (
		<>
			<div className="rounded flex-row shadow-lg text-black">
				<img src={props.source} alt={props.name || "Category"} className={`h-10 w-10 p-1 rounded`}/>
			</div>
		</>
	)
}
