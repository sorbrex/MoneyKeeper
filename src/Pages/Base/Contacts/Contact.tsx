import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@Pages/Base/Contacts/Components/Contact_Form"
import Footer from "@UI/Complex/Footer/Footer"
import LogoTitle from "@UI/Simple/LogoTitle"


export default function Contact() {

	return (
		<>
			<section id="Contact_Form" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<LogoTitle />

						<h1 className="text-4xl font-medium">Contact Us</h1>
						<p className="mt-3">Your Opinion is Important to Us.</p>

						<Form />

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
