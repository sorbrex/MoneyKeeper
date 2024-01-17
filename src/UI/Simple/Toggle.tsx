import React from "react";

export default function Toggle(props:{active: boolean, onToggle: () => void}) {
	return (
		<div className="relative w-10 mb-2">
			<input type="checkbox" id="toggle" onClick={props.onToggle} className={`absolute w-6 h-6 appearance-none rounded-full border-2 cursor-pointer ${props.active ? "right-0 bg-pureBlack" : "left-0 bg-white"} `}/>
			<label htmlFor="toggle" className={`block h-6 rounded-full cursor-pointer border-softBlack border-2`}></label>
		</div>
	)
}