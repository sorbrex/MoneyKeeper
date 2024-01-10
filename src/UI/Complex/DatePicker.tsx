import React, { useState } from "react"
import { format, subMonths} from "date-fns"
import { DateRange, DayPicker} from "react-day-picker"

const pastMonth = subMonths(new Date(), 1)

export default function DatePicker(props: {visibile: boolean, toggleVisibility: (state: boolean) => void}){
	const defaultSelected: DateRange = {
		from: pastMonth,
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

	function onPick(selectedRange: DateRange | undefined){
		setRange(selectedRange)
		if (selectedRange === undefined || selectedRange.from === undefined || selectedRange.to === undefined) return
		console.log(selectedRange)
		const assertedRange = selectedRange as DateRange
		const timestampFrom = format(assertedRange.from as Date , "T")
		const timestampTo = format(assertedRange.to as Date , "T")
		console.log("From => " + timestampFrom)
		console.log("To => " + timestampTo)
	}


	return (
		<div className="relative border-2 border-solid border-black m-2">
			<div id="Calendar" className={`relative ${props.visibile ? "" : "hidden"}`}>
				<DayPicker
					mode="range"
					defaultMonth={pastMonth}
					selected={range}
					onSelect={onPick}
					footer={
						<div className="flex flex-row justify-center">
							<button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ease-in-out" onClick={() => props.toggleVisibility(false)}>Save</button>
						</div>
					}
				/>
			</div>
		</div>
	)
}