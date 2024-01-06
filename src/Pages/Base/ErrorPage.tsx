import React from "react"
import { useRouteError, Link } from "react-router-dom"

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id="error-page" className="dark:text-white dark:bg-softBlack bg-pageGray text-black h-screen w-screen flex flex-col justify-center items-center">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{JSON.stringify(error)}</i>
			</p>
			<Link to={"/"}>Home Page</Link>
		</div>
	)
}