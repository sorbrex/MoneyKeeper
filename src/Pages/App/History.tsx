import React, { useEffect, useState } from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import { Auth } from "@/Helpers/Helpers"
import { useNavigate } from "react-router"

export default function History() {
	const [isLogged, setIsLogged] = useState(false)
	const navigate = useNavigate()
	
	useEffect(() => {
		document.title = "Dashboard"
		Auth().then((res) => {
			res ? setIsLogged(true) : navigate("/login")
		})
	}, [])

	return (
		<CenteredContainer>
			{
				isLogged ? (
					<h1>History</h1>
				) : (
					<h1>You are not logged in</h1>
				)
			}
		</CenteredContainer>
	)
}
