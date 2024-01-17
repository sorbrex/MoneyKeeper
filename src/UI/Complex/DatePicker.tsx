import React, { useState } from "react"
import { format, subMonths} from "date-fns"
import { DateRange, DayPicker} from "react-day-picker"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"

const pastMonth = subMonths(new Date(), 1)
const defaultSelected: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function DatePicker(props:{initializeWithDate?: {from: Date, to: Date}}){
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
	const [calendarVisible, setCalendarVisible] = useState<boolean>(false)

	if (props.initializeWithDate !== undefined) {
		const {from, to} = props.initializeWithDate
		setRange({from, to})
	}

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
		<div className="relative m-2">
			<ButtonPrimary content={formatSelected()} onClick={() => setCalendarVisible(!calendarVisible)} className="w-[310px]"/>

			<div id="Calendar" className={`${calendarVisible ? "" : "hidden"} bg-white rounded-xl shadow-xl absolute`}>
				<DayPicker
					showOutsideDays
					mode="range"
					defaultMonth={pastMonth}
					selected={range}
					onSelect={onPick}
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