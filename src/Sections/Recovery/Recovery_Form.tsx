import React from "react"
import Alert from "@/UI/Alert"
import { BASE_URL } from "@/Helpers/Helpers"
import SubmitButton from "@/UI/Buttons/SubmitButton"
import {AlertType, RecoveryFormValues} from "@/interfaces"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import { useNavigate } from "react-router"
import {Link} from "react-router-dom";

export default function Recovery_Form() {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const [loading, setLoading] = React.useState(false)
	const navigate = useNavigate()

	//TODO: To Fix
	async function handleFormSubmit (values: RecoveryFormValues) {
		setLoading(true)

		let receivedError: string | undefined = undefined
		const newValues = {
			email: values.email
		}

		const result = await Axios.post(`${BASE_URL}/user/reset` || "", newValues).catch(error => {
			console.log("Error On Request: ", error)
			receivedError = error?.response?.data?.error || error?.response?.data?.message || undefined
		})

		const recoveryConfirmation = result?.status.toString().includes("20")
		recoveryConfirmation ? manageRecoverySuccess(result) : manageRecoveryError(receivedError || "Please Retry Later")

		setLoading(false)
		setAlertShown(true)
		setTimeout(() => {
			setAlertShown(false)
		}, 2500)
	}

	function manageRecoverySuccess(res: any) {
		setAlertType("info")
		setAlertMessage("Email Sent Successfully! Redirect...")
		setTimeout(() => {
			navigate("/login")
		}, 2500)
	}

	function manageRecoveryError(error?: string) {
		setAlertType("error")
		setAlertMessage("Recovery Failed. " + error + "!")
	}

	return (
		<>
			{/*Formik Configuration For All Fields, Error, and Submit*/}
			<Formik
				initialValues={{ email: ""}}
				validationSchema={Yup.object({
					email:
						Yup
							.string()
							.required("Required")
							.email("Invalid email address"),
				})}
				onSubmit={async (values, action) => {
					await handleFormSubmit(values)
					action.setSubmitting(false)
				}}
			>

				{/* Actual Formik Form Structure */}
				<Form className="mt-10 p-6">
					<div id="GridLay" className="grid gap-6 sm:grid-cols-2">

						<div id="Form_Element_Email" className="relative z-0 col-span-2 m-1">
							<Field name="email" type="email" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className=" text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureblack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Email</label>
							<ErrorMessage name="email" />
						</div>

					</div>

					<SubmitButton title={"Recovery"} loading={loading}/>
				</Form>

			</Formik>

			<div className="relative z-0 col-span-2 m-1 text-sm">
				Dont Have an Account? <Link className="mr-4 underline md:mr-6 text-linkBlue" to={"/signup"}> SignUp!</Link>
			</div>

			<Alert visible={alertShown} type={alertType} message={alertMessage}/>

		</>
	)
}
