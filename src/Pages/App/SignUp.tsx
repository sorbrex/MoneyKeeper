import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/SignUp/SignUp_Form"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"

export default function SignUp() {
	return (
		<>
			<section id="SignUp_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<div className="w-full h-auto flex justify-center items-center mb-3">
							<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
						</div>

						<h1 className="text-4xl font-medium">SignUp</h1>
						<p className="mt-3">Create an Account and Start Saving Now</p>

						<Form />
						
					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
