import React, { useEffect } from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Form from "@/Sections/LogIn/LogIn_Form"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"
import FacebookLogin from "react-facebook-login"
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai"
import Axios from "axios"
import CryptoJS from "crypto-js"


export default function LogIn() {
	const [FACEBOOK_APP_ID, setFacebookAppId] = React.useState(null)
	const baseUrl = "http://localhost:3000"

	useEffect(() => {
		const fetchFacebookAppId = async () => {
			const requestId = Math.random().toString(36).substring(2, 15)
			const challengeObject = (await Axios.get(`${baseUrl}/private/facebook_app_id?requestId=${requestId}`)).data
			const decryptPassphrase = (await Axios.get(`${baseUrl}/private/challenge_passphrase?requestId=${requestId}&challenge=${challengeObject?.challengeKey}`)).data
			const decryptedAppId = CryptoJS.AES.decrypt(challengeObject?.encryptedAppId, decryptPassphrase.passphrase)
			setFacebookAppId(decryptedAppId.toString(CryptoJS.enc.Utf8))
		}

		fetchFacebookAppId()

	},[])


	//Chech if a jwt is already stored in the local storage, if not, show the login form
	//If a jwt is already stored, redirect to the dashboard
	//For the login: we will encode the given password and compare it to the one in the database.
	//		values.password = sha256(values.password).toString()
	function handleFacebookFailure (error: any) {
		console.log(error.status)
	}

	function handleFacebookResponse (userInfo: any) {
		if (userInfo.accessToken) {
			console.log("Logged in")
		} else {
			console.log("Not logged in")
		}
		console.log(userInfo)
	}

	return (
		<>
			<section id="Login_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<div className="w-full h-auto flex justify-center items-center mb-3">
							<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
						</div>

						<h1 className="text-4xl font-medium">LogIn</h1>
						<p className="mt-3">Insert Your Credentials And Go To MoneyKeeper Dashboard</p>

						<Form />

						<div className="w-full flex justify-center items-center"> 
							<div className="w-2/5 border-b-2 m-2"/> or <div className="w-2/5 border-b-2 m-2"/>
						</div>

						<div className="w-full"> 
							{FACEBOOK_APP_ID ? (
								<FacebookLogin
									appId={FACEBOOK_APP_ID}
									fields="name,email,picture"
									callback={handleFacebookResponse}
									onFailure={handleFacebookFailure}
									icon={<AiOutlineFacebook className="w-full h-full"/>}
									textButton=""
									cssClass="w-14 h-14 text-black bg-white"
								/>
							) : null}
						</div>

					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
