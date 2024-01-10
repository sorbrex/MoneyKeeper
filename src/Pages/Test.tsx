import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import DatePicker from "@UI/Complex/DatePicker"

export default function Test() {
	const [show, setShow] = React.useState(false)

	return (
		<>
			<section id="Test_Page" className="h-screen flex flex-col">

				<CenteredContainer>
					<h1 className="text-4xl font-bold">Test Page</h1>
					{/*<div className="flex flex-row gap-2">*/}
					{/*	<CategoryIcon icon="Car"/>*/}
					{/*	<CategoryIcon icon="Food"/>*/}
					{/*	<CategoryIcon icon="Health"/>*/}
					{/*	<CategoryIcon icon="Hobby"/>*/}
					{/*	<CategoryIcon icon="Home"/>*/}
					{/*</div>*/}
					<DatePicker visibile={show} toggleVisibility={setShow} />

					<button className={"px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ease-in-out"} onClick={()=>setShow(true)}>Show</button>
				</CenteredContainer>

			</section>
		</>
	)
}
