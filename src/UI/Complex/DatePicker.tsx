import React, { useState } from "react"
import { format } from "date-fns"
import { DateRange, DayPicker} from "react-day-picker"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"

export default function DatePicker(props: DatePickerProps){
	const [calendarVisible, setCalendarVisible] = useState<boolean>(false)


	function formatSelected(){
		let formattedString = ""
		if (props.range === undefined) return "Pick a Date"

		const assertedRange = props.range as DateRange

		if (assertedRange.from === undefined) formattedString = "_"
		else formattedString = format(assertedRange.from as Date , "PP")

		formattedString += " - "

		if (assertedRange.to === undefined) formattedString += "_"
		else formattedString += format(assertedRange.to as Date , "PP")

		return formattedString
	}

	return (
		<div className="relative m-2">
			<ButtonPrimary content={formatSelected()} onClick={() => setCalendarVisible(!calendarVisible)} className="w-[310px]"/>

			<div id="Calendar" className={`${calendarVisible ? "" : "hidden"} bg-white rounded-l shadow-xl absolute bottom-0`}>
				<DayPicker
					showOutsideDays
					mode="range"
					defaultMonth={props.range.from}
					selected={props.range}
					onSelect={props.onRangeSelected}
					footer={
						<div className="flex flex-col justify-center items-center">
							<hr className="w-2/3 mt-2"/>
							<ButtonPrimary content="Save" onClick={() => setCalendarVisible(false)} className="mt-2 bg-pageGray"/>
						</div>
					}
				/>
			</div>
		</div>
	)
}

type DatePickerProps = {
	onRangeSelected: (range: DateRange | undefined) => void
	range: DateRange
}