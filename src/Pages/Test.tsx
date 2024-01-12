import React, {useState} from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import DatePicker from "@UI/Complex/DatePicker"
import CategoryIcon from "@UI/Simple/CategoryIcon"

export default function Test() {
	const [utilsState, setUtilsState] = useState(false)

	return (
		<>
			<section id="Test_Page" className="h-screen flex flex-col">

				<CenteredContainer>
					<h1 className="text-4xl font-bold">Tutte Cose Sopra per Reference</h1>
					<div className="flex flex-row gap-2">
						<CategoryIcon icon="Car"/>
						<CategoryIcon icon="Food"/>
						<CategoryIcon icon="Health"/>
						<CategoryIcon icon="Hobby"/>
						<CategoryIcon icon="Home"/>
					</div>
					<DatePicker />
				</CenteredContainer>

			</section>
		</>
	)
}
