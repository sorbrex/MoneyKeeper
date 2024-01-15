import React, {useState} from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"

export default function Test() {
	const [utilsState, setUtilsState] = useState(false)

	return (
		<>
			<section id="Test_Page" className="h-screen flex flex-col">
				<CenteredContainer>

				</CenteredContainer>
			</section>
		</>
	)
}
