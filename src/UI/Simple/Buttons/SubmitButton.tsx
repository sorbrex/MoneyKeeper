import React from "react"
import { AiOutlineLoading } from "react-icons/ai"

export default function SubmitButton( props: { title: string, loading: boolean} ) {
	return (
		<button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white cursor-pointer" disabled={props.loading}>
			<div className="flex items-center justify-between">
				<p className="">{props.title}</p>
				{ props.loading ? <AiOutlineLoading className="ml-5 animate-spin" /> : null }
			</div>
		</button>
	)
}
