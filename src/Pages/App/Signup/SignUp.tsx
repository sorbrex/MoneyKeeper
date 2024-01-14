import React, {useEffect} from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@Pages/App/Signup/Components/SignUp_Form"
import Footer from "@UI/Complex/Footer/Footer"
import LogoTitle from "@UI/Simple/LogoTitle"

export default function SignUp() {
	useEffect(() => {
		document.title = "MoneyKeeper | SignUp"
	}, [])

	return (
		<>
			<section id="SignUp_Page" className="h-screen flex flex-col bg-white text-black">
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
