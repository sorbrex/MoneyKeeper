import React from "react"
import Logo from "@Assets/Logo_White.png"

export default function Footer() {
	return (
		<>
			<footer className="p-4 bg-black shadow md:px-6 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
						<img src={Logo} className="mr-3 h-8" alt="Flowbite Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Money Keeper</span>
					</a>
					<ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
						</li>
						<li>
							<a href="#" className="hover:underline">Contact</a>
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
