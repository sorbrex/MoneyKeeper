import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ContactFormValues } from "@/interfaces"

export default function ContactForm( props: { handleFormSubmit: (values: ContactFormValues) => void } ) {

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
					props.handleFormSubmit(values)
					action.setSubmitting(false)
					action.resetForm()
				}}
			>

				{/* Actual Formik Form Structure */}
				<Form className="mt-10 p-6">
					<div id="GridLay" className="grid gap-6 sm:grid-cols-2">
						{/* 
							The Peer Class is used to modify sibilings element. 
							In this case, i put peer on input, and on input change state i change class on label
						*/}

						<div id="Contact_Element_Name" className="relative z-0">
							<Field name="name" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" />
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Your Name</label>
							<ErrorMessage name="name" />
						</div>

						<div id="Contact_Element_Email" className="relative z-0">
							<Field name="email" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" />
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Your Email</label>
							<ErrorMessage name="email" />
						</div>

						<div id="Contact_Element_TextArea" className="relative z-0 col-span-2 m-1">
							<Field name="message" as="textarea" rows={5} placeholder=" " className="form-textarea peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" style={{resize:"none"}}/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Your Message</label>
							<ErrorMessage name="message" />
						</div>
					</div>

					<button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
				</Form>

			</Formik>
		</>

	)
}
