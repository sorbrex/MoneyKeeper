import React from "react"

export default function Form() {
	return (
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
					<input type="text" 
						name="email" 
						className="
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
	)
}

export type FormSingleContent = {
	type: string
	name: string
	placeHolder: string
}

export type FormProps = {
	contents: FormSingleContent[]
	hasSubmitButton?: boolean
	hasResetButton?: boolean
	redirect?: string
}
