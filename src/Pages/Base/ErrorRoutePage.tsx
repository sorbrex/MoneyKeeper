import React from "react"
import { useRouteError, Link } from "react-router-dom"

export default function ErrorRoutePage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id="error-page" className="text-white bg-softBlack h-screen w-screen flex flex-col justify-center items-center">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{JSON.stringify(error)}</i>
			</p>
			<Link to={"/"}>Home Page</Link>
		</div>
	)
}