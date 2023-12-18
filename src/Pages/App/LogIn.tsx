import React, { useEffect } from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/LogIn/LogIn_Form"
import Footer from "@/UI/Footer"
import LogoTitle from "@/UI/LogoTitle"
import { useNavigate } from "react-router"

export default function LogIn() {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = "MoneyKeeper | LogIn"
		
		if (sessionStorage.getItem("users-jwt")) {
			navigate("/dashboard")
		}
	}, [])

	return (
		<>
			<section id="Login_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<LogoTitle />

						<h1 className="text-4xl font-medium">LogIn</h1>
						<p className="mt-3">Insert Your Credentials And Go To MoneyKeeper Dashboard</p>

						<Form />

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}

