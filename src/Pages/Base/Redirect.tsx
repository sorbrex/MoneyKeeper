import React, { useEffect } from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import LogoTitle from "@/UI/LogoTitle"
import Footer from "@/UI/Footer"
import { Link, useNavigate } from "react-router-dom"


export default function Redirect() {
	const navigate = useNavigate()

	useEffect (() => {
		setTimeout(() => {
			navigate("/login")
		}, 5000)
	},[])

	return (
		<>
			<section id="SignUp_Page" className="h-screen flex flex-col">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<LogoTitle />

						<h1 className="text-4xl font-medium">Redirecting ...</h1>
						<p className="mt-3">Thank you for joining the Money Keeper Family!<br/>
We have sent you a confirmation email. Check your mailbox and once your email is confirmed you can start using our service.
							<br/><br/><br/><br/>Sometimes the confirmation email may arrive in your junk/spam folder, check there too if you can&apos;t find it in your main mailbox.</p>

					</div>

					<p className="m-8">You will be redirect to Login Page in 5 seconds. <br/>If not, click <Link to={"/login"} className="text-faceBlue">here</Link></p>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
