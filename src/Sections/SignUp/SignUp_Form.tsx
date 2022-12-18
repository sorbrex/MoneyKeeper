import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import SubmitButton from "@/UI/Buttons/SubmitButton"
import { AlertType, SignUpFormValues } from "@/interfaces"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import sha256 from "crypto-js/sha256"
import Alert from "@/UI/Alert"


export default function SignUp_Form() {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const [loading, setLoading] = React.useState(false)
	const navigate = useNavigate()

	function handleFormSubmit (values: SignUpFormValues) {
		const baseUrl = "https://money-keeper-api.onrender.com"

		values.password = sha256(values.password).toString()
		setLoading(true)
		Axios.post(`${baseUrl}/user/signup` || "", values)
			.then(() => {
				setLoading(false)
				setAlertType("info")
				setAlertMessage("Sign Up Successfully! Redirect... ")
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
					navigate("/redirect")
				}, 1500)
			})
			.catch((error) => {
				setLoading(false)
				setAlertType("error")
				setAlertMessage("Sign Up Failed! " + error.message)
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
				}, 2500)
			})
	}

	return (
		<>
			{/*Formik Configuration For All Fields, Error, and Submit*/}
			<Formik
				initialValues={{ name: "", surname: "", email: "", password: "", password_confirmation: "" }}
				validationSchema={Yup.object({
					name: 
					Yup
						.string()
						.required("Required")
						.max(15, "Field Too Long. If you have multiple name, please use initials."),
						
					surname:
					Yup
						.string()
						.required("Required")
						.max(15, "Field Too Long. If you have multiple surname, please use initials."),
						
					email: 
					Yup
						.string()
						.required("Required")
						.email("Invalid email address"),

					password: 
					Yup
						.string()
						.required("Required")
						.min(8, "Password Must Contain From 8 to 16 Characters")
						.max(16, "Password Must Contain From 8 to 16 Characters")
						.matches(/[0-9]/, "Password Must Contain at Least One Number")
						.matches(/[a-z]/, "Password Must Contain at Least One Lowercase Letter")
						.matches(/[A-Z]/, "Password Must Contain at Least One Uppercase Letter"),

					password_confirmation:
					Yup
						.string()
						.required("Required")
						.oneOf([Yup.ref("password"), null], "Passwords Must Match"),

				})}
				onSubmit={(values, action) => {
					handleFormSubmit(values)
					action.setSubmitting(false)
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
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Name</label>
							<ErrorMessage name="name" />
						</div>

						<div id="Form_Element_Surname" className="relative z-0">
							<Field name="surname" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0" />
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">Surname</label>
							<ErrorMessage name="surname" />
						</div>

						<div id="Form_Element_Email" className="relative z-0 col-span-2 m-1">
							<Field name="email" type="email" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Email</label>
							<ErrorMessage name="email" />
						</div>

						<div id="Form_Element_Password" className="relative z-0 col-span-2 m-1">
							<Field name="password" type="password" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Password</label>
							<ErrorMessage name="password" />
						</div>

						<div id="Form_Element_PasswordConfirmation" className="relative z-0 col-span-2 m-1">
							<Field name="password_confirmation" type="password" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Repeat Password</label>
							<ErrorMessage name="password_confirmation" />
						</div>
					</div>

					<SubmitButton title={"Register"} loading={loading}/>
				</Form>

			</Formik>


			<Alert visible={alertShown} type={alertType} message={alertMessage}/>

		</>

	)
}
