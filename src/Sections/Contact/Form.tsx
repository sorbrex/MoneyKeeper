import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

export default function ContactForm() {
	const [alertShown, setalertShown] = React.useState(false)

	function handleFormSubmit (values: FormValues) {
		setTimeout(() => {
			setalertShown(false)
		}, 2500)
		//Axios.post("https://api.example.com", values) Server Side there will be an endpoint that use Nodemailer to send the email
	}

	return (
		<>
			{/*Formik Configuration For All Fields, Error, and Submit*/}
			<Formik
				initialValues={{ name: "", email: "", message: "" }}
				validationSchema={Yup.object({
					name: 
					Yup
						.string()
						.max(15, "Field Too Long. If you have multiple name, please use initials.")
						.required("Required"),
					email: 
					Yup
						.string()
						.email("Invalid email address")
						.required("Required"),
					message: 
					Yup
						.string()
						.max(300, "Message Too Long. Please shorten your message in 300 characters or less.")
						.required("Required"),
				})}
				onSubmit={(values, action) => {
					handleFormSubmit(values)
					action.setSubmitting(false)
					action.resetForm()
					setalertShown(true)
				}}
			>

				{/* Actual Formik Form Structure */}
				<Form className="mt-10 p-6">
					<div id="GridLay" className="grid gap-6 sm:grid-cols-2">
						{/* 
							The Peer Class is used to modify sibilings element. 
							In this case, i put peer on input, and on input change state i change class on label
						*/}

						<div id="Form_Element_Name" className="relative z-0">
							<Field name="name" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" />
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Your Name</label>
							<ErrorMessage name="name" />
						</div>

						<div id="Form_Element_Email" className="relative z-0">
							<Field name="email" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" />
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Your Email</label>
							<ErrorMessage name="email" />
						</div>

						<div id="Form_Element_TextArea" className="relative z-0 col-span-2 m-1">
							<Field name="message" as="textarea" rows={5} placeholder=" " className="form-textarea peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" style={{resize:"none"}}/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Your Message</label>
							<ErrorMessage name="message" />
						</div>
					</div>

					<button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
				</Form>

			</Formik>

			{/*Alert For All Good*/}
			<div className={`w-full h-auto flex justify-center items-center transition fade-in duration-700 ${alertShown ? "opacity-100" : "opacity-0"}`}>
				<div className="w-full bg-pureblack text-sm text-white rounded-md shadow-lg" role="alert">
					<div className="flex p-4">
						Message Sent Correctly !
						<div className="ml-auto">
							<button 
								type="button" 
								className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white transition-all text-sm"
								onClick={() => setalertShown(false)}
							>
								<span className="sr-only">Close</span>
								<svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

		</>
		

	)
}


type FormValues = {
	name: string
	email: string
	message: string
}