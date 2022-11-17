import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Footer from "@/UI/Footer"
import Logo from "@Assets/Logo_Black.png"


export default function Contact() {
	return (
		<>
			<section id="Contact_Form" className="h-screen flex flex-col justify-end">
				<CenteredContainer>
					<div className="mx-auto w-full max-w-lg">

						<div className="w-full h-auto flex justify-center items-center mb-3">
							<img src={Logo} className="h-20" alt="MoneyKeeper Logo" />
						</div>

						<h1 className="text-4xl font-medium">Contact Us</h1>
						<p className="mt-3">Your Opinion is Important to Us.</p>

						<form action="sendToMyApi" className="mt-10">
					
							<div className="grid gap-6 sm:grid-cols-2">
								<div className="relative z-0">
									<input 
										type="text" 
										name="name" 
										className="
											peer block w-full appearance-none 
											border-0 border-b border-gray-500
											bg-transparent 
											py-2.5 px-0 
											text-sm 
											text-gray-900 
											focus:outline-none 
											focus:ring-0" placeholder=" " />
									{/* The Peer Class is used to modify sibilings element. In this case, i put peer on input, and on input change state i change class on label*/}
									<label className="
										text-[#9CA3AF]
										absolute top-0 left-0 -z-10 origin-[0]
										transform text-lg duration-300 
										-translate-y-6 scale-75

										peer-placeholder-shown:scale-100
										peer-placeholder-shown:translate-y-0 

										peer-focus:text-pureblack
										peer-focus:left-0
										peer-focus:-translate-y-6
										peer-focus:scale-75
									">Your Name</label>
								</div>
								<div className="relative z-0">
									<input type="text" name="email" className="
											peer block w-full appearance-none 
											border-0 border-b border-gray-500
											bg-transparent 
											py-2.5 px-0 
											text-sm 
											text-gray-900 
											focus:outline-none 
											focus:ring-0" placeholder=" "/>
									<label className="
										text-[#9CA3AF]
										absolute top-0 left-0 -z-10 origin-[0]
										transform text-lg duration-300 
										-translate-y-6 scale-75

										peer-placeholder-shown:scale-100
										peer-placeholder-shown:translate-y-0 

										peer-focus:text-pureblack
										peer-focus:left-0
										peer-focus:-translate-y-6
										peer-focus:scale-75
									">Your Email</label>
								</div>
								<div className="relative z-0 col-span-2 m-1">
									<textarea 
										name="message" 
										rows={5} 
										className="
											peer block w-full appearance-none 
											border-0 border-b border-gray-500 
											bg-transparent 
											py-2.5 px-0 
											text-sm text-gray-900 
											
											focus:outline-none 
											focus:ring-0" 
										placeholder=" " 
										style={{resize:"none"}}></textarea>
									<label className="
										text-[#9CA3AF]
										absolute top-0 left-0 -z-10 origin-[0]
										transform text-lg duration-300 
										-translate-y-6 scale-75

										peer-placeholder-shown:scale-100
										peer-placeholder-shown:translate-y-0 

										peer-focus:text-pureblack
										peer-focus:left-0
										peer-focus:-translate-y-6
										peer-focus:scale-75
									">Your Message</label>
								</div>
							</div>
							<button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
						</form>
					</div>
				</CenteredContainer>

				<Footer />
			</section>
		</>
	)
}
