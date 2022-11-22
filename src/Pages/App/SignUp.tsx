import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/SignUp/SignUp_Form"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"
import Alert from "@/UI/Alert"
import { AlertType, SignUpFormValues } from "@/interfaces"
import { useNavigate } from "react-router-dom"


export default function SignUp() {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const navigate = useNavigate()

	function handleFormSubmit (values: SignUpFormValues) {
		//DEBUG:
		setAlertType("info")
		setAlertMessage("Sign Up Successfully! Redirect... ")
		setAlertShown(true)
		setTimeout(() => {
			setAlertShown(false)
			navigate("/redirect")
		}, 2500)
		/*
		Axios.post("https://api.example.com", values) Server Side Will Handle the Sign Up. Should Crypt the Password before send (md5 can be good)
		.then(() => {
				setAlertType("info")
				setAlertMessage("Sign Up Successfully! Redirect... ")
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
					navigate("/redirect");
				}, 2500)
		})
		.catch(() => {
				setAlertType("error")
				setAlertMessage("Sign Up Failed!")
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
				}, 2500)
		})
		*/
	}


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

						<Form handleFormSubmit={handleFormSubmit}/>
						
						<Alert visible={alertShown} type={alertType} message={alertMessage}/>

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
