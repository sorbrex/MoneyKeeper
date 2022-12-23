import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/LogIn/LogIn_Form"
import Footer from "@/UI/Footer"
import LogoTitle from "@/UI/LogoTitle"

export default function LogIn() {
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

