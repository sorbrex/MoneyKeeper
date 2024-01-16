import React from "react";

export default function Toggle(props:{active: boolean, onToggle: () => void}) {
	return (
		<div className="relative w-10 mb-2">
			<input type="checkbox" checked={props.active} onChange={()=>console.log("Change")} onClick={props.onToggle} name="toggle" id="toggle" className="absolute w-6 h-6 appearance-none rounded-full border-2 border-red-500 cursor-pointer left-0 bg-white checked:right-0 checked:bg-pureBlack"/>
			<label htmlFor="toggle" className={`${props.active ? "bg-pureBlack" : "bg-white"} block overflow-hidden h-6 rounded-full cursor-pointer border-pageGray border-2`}></label>
		</div>
	)
}