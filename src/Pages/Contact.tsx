import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/Contact/Form"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"


export default function Contact() {
	return (
		<>
			<section id="Contact_Form" className="h-screen flex flex-col justify-end">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<div className="w-full h-auto flex justify-center items-center mb-3">
							<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
						</div>

						<h1 className="text-4xl font-medium">Contact Us</h1>
						<p className="mt-3">Your Opinion is Important to Us.</p>

						{/**TODO: MAKE A VALIDATION AND PUT HERE THE LINK TO THE REAL API */}
						<Form />
					
					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
