import React, { useState } from "react"
import { format, subMonths} from "date-fns"
import { DateRange, DayPicker} from "react-day-picker"
import BaseButton from "@UI/Simple/Buttons/BaseButton"

const pastMonth = subMonths(new Date(), 1)
const defaultSelected: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function DatePicker(){
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
	const [calendarVisible, setCalendarVisible] = useState<boolean>(false)

	function formatSelected(){
		let formattedString = ""
		if (range === undefined) return "Pick a Date"

		const assertedRange = range as DateRange

		if (assertedRange.from === undefined) formattedString = "_"
		else formattedString = format(assertedRange.from as Date , "PP")

		formattedString += " - "

		if (assertedRange.to === undefined) formattedString += "_"
		else formattedString += format(assertedRange.to as Date , "PP")

		return formattedString
	}

	function onPick(selectedRange: DateRange | undefined){
		setRange(selectedRange)
		if (selectedRange === undefined || selectedRange.from === undefined || selectedRange.to === undefined) return
		console.log(range)
		const assertedRange = range as DateRange
		const timestampFrom = format(assertedRange.from as Date , "T")
		const timestampTo = format(assertedRange.to as Date , "T")
		console.log("From => " + timestampFrom)
		console.log("To => " + timestampTo)
	}



	return (
		<div className="relative m-2 flex-row justify-center items-center">
			<BaseButton content={formatSelected()} onClick={() => setCalendarVisible(!calendarVisible)} className="min-w-[300px]"/>

			<div id="Calendar" className={`${calendarVisible ? "" : "hidden"} bg-pageGray rounded-xl absolute`}>
				<DayPicker
					showOutsideDays
					mode="range"
					defaultMonth={pastMonth}
					selected={range}
					onSelect={onPick}
					footer={
						<div className="flex flex-col justify-center items-center">
							<hr className="w-1/2"/>
							<BaseButton content="Save" onClick={() => setCalendarVisible(false)} className="mt-2"/>
						</div>
					}
				/>
			</div>
		</div>
	)
}