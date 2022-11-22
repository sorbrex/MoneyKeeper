import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/Contact/Contact_Form"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"
import Alert from "@/UI/Alert"
import { AlertType, ContactFormValues } from "@/interfaces"


export default function Contact() {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")

	function handleFormSubmit (values: ContactFormValues) {
		/*
		Axios.post("https://api.example.com", values) Server Side there will be an endpoint that use Nodemailer to send the email
		.then(() => {
				setAlertType("info")
				setAlertMessage("Message Sent Successfully!")
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
				}, 2500)
		})
		.catch(() => {
				setAlertType("error")
				setAlertMessage("Message Sent Failed!")
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
				}, 2500)
		})
		*/
	}

	return (
		<>
			<section id="Contact_Form" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<div className="w-full h-auto flex justify-center items-center mb-3">
							<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
						</div>

						<h1 className="text-4xl font-medium">Contact Us</h1>
						<p className="mt-3">Your Opinion is Important to Us.</p>

						<Form handleFormSubmit={handleFormSubmit}/>

						{/*Alert For All Good*/}
						<Alert visible={alertShown} type={alertType} message={alertMessage} />

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
