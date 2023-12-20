import React, { useEffect, useState } from "react"
import { Auth } from "@/Helpers/Helpers"
import { useNavigate } from "react-router"
import AppHeader from "@Sections/App/AppHeader"
import AppFooter from "@Sections/App/AppFooter"

export default function Dashboard() {
	const [isLogged, setIsLogged] = useState(false)
	const navigate = useNavigate()
	
	useEffect(() => {
		document.title = "Dashboard"
		console.log("Dashboard Use Effect")
		Auth().then((res) => {
			res ? setIsLogged(true) : navigate("/login")
		})
	}, [])

	return (
		<>
			<AppHeader username="Janna" page={document.title}/>
			{/*TODO: Should Fetch the Username from The Saved Session or Something*/}

			{/*<section id="Account_Section">*/}
			{/*	<Account />*/}
			{/*</section>*/}

			<AppFooter />
		</>
	)
}
