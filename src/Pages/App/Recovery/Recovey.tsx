import React from "react"
import {useNavigate} from "react-router";
import CenteredContainer from "@/Layouts/CenteredContainer";
import LogoTitle from "@UI/Simple/LogoTitle";
import Form from "@Pages/App/Recovery/Components/Recovery_Form";
import Footer from "@UI/Complex/Footer/Footer";

export default function Recovery() {
	const navigate = useNavigate()

	return (
		<>
			<section id="Recovery_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<LogoTitle />

						<h1 className="text-4xl font-medium">Recovery</h1>
						<p className="mt-3">Insert Your Email Address To Receive a Temporary Password</p>

						<Form />

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}