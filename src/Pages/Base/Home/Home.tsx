import React from "react"
import Header from "@UI/Complex/Header/Header"
import Description from "@Pages/Base/Home/Components/Description"
import Features from "@Pages/Base/Home/Components/Features"
import Home from "@Pages/Base/Home/Components/HomeSection"
import Footer from "@UI/Complex/Footer/Footer"
export default function HomePage() {
	return (
		<>
			<Header />
			
			<section id="Home">
				<Home />
			</section>
			
			<section id="Savings">
				<Description />
			</section>

			<section id="Features">
				<Features />
			</section>

			<Footer />

		</>
	)
}
