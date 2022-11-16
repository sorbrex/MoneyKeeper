import React from "react"
import Header from "@UI/Header"
import Description from "@/Sections/Home/Description"
import Features from "@Sections/Home/Features"
import Home from "@Sections/Home/Home"
import Footer from "@/UI/Footer"
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
