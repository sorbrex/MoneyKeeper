import React, {useEffect} from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/SignUp/SignUp_Form"
import Footer from "@/UI/Footer"
import LogoTitle from "@/UI/LogoTitle"

export default function SignUp() {
	useEffect(() => {
		document.title = "MoneyKeeper | SignUp"
	}, [])

	return (
		<>
			<section id="SignUp_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<LogoTitle />

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
