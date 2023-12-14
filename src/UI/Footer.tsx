import React from "react"
import Logo from "@/Assets/Logo_White.png"
import { Link } from "react-router-dom"

export default function Footer() {
	return (
		<>
			<footer className="p-4 bg-black shadow md:px-6 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link to={"/"} className="flex items-center mb-4 sm:mb-0">
						<img src={Logo} className="mr-3 h-8" alt="MoneyKeeper Logo"/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Money Keeper</span>
					</Link>
					<ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<Link className="mr-4 hover:underline md:mr-6 " to={"/about"}>About</Link>
						</li>
						<li>
							<Link className="mr-4 hover:underline md:mr-6 " to={"/contact"}>Contact</Link>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022 SORBELLO NANDO | NANDOSORBELLO@LIVE.IT
				</span>
			</footer>
		</>
	)
}
