import React from "react"

export default function ErrorPage(props:{message:string}) {
	return (
		<div id="error-page" className="text-white bg-softBlack h-screen w-screen flex flex-col justify-center items-center">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{props.message}</i>
			</p>
		</div>
	)
}