import React from "react"
import {AlertType, PasswordChangeFormValues} from "@/Types/Types"
import Alert from "@UI/Simple/Alert"
import {ErrorMessage, Field, Form, Formik} from "formik"
import * as Yup from "yup"
import SubmitButton from "@UI/Simple/Buttons/SubmitButton"
import sha256 from "crypto-js/sha256"
import DismissButton from "@UI/Simple/Buttons/DismissButton"
import {useUpdateUserPasswordMutation} from "@/Services/ServiceAPI";

export default function UpdatePasswordModalForm(props: ModalProps) {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const [loading, setLoading] = React.useState(false)
	const [updateUserPassword] = useUpdateUserPasswordMutation()

	function showAlertHideModal() {
		setAlertShown(true)
		setTimeout(() => {
			setAlertShown(false)
			setTimeout(() => {
				props.setModalState(false)
			}, 300)
		}, 2500)
	}

	async function handlePasswordSubmit (values: PasswordChangeFormValues) {
		setLoading(true)

		// Check if old password is correct
		if (sha256(values.oldPassword).toString() !== props.originalPassword) {
			console.error("Old Password Is Incorrect")
			setAlertType("error")
			setAlertMessage("Old Password Is Incorrect")
			setLoading(false)
			setAlertShown(true)
			setTimeout(() => {
				setAlertShown(false)
			}, 2500)
			return
		}

		// Check if new password is different from old password (prevent unnecessary requests)
		if(sha256(values.oldPassword).toString() === sha256(values.newPassword).toString()) {
			console.error("New Password Cannot Be The Same As Old Password")
			setAlertType("error")
			setAlertMessage("New Password Cannot Be The Same As Old Password")
			setLoading(false)
			setAlertShown(true)
			setTimeout(() => {
				setAlertShown(false)
			}, 2500)
			return
		}

		// Send Password Change Request
		updateUserPassword(sha256(values.newPassword).toString())
			.unwrap()
			.then(_ => {
				setAlertType("success")
				setAlertMessage("Password Change Successfully!")
			})
			.catch(error => {
				setAlertType("error")
				setAlertMessage(`Cannot Change Password! ${error}`)
			}).finally(() => {
				setLoading(false)
				showAlertHideModal()
			})
	}


	return (
		<>

			<Formik
				initialValues={{ oldPassword: "", newPassword: "", newPasswordConfirmation: ""}}
				validationSchema={Yup.object({
					oldPassword:
						Yup
							.string()
							.required("Required")
							.min(8, "Password Must Contain From 8 to 16 Characters")
							.max(16, "Password Must Contain From 8 to 16 Characters")
							.matches(/[0-9]/, "Password Must Contain at Least One Number")
							.matches(/[a-z]/, "Password Must Contain at Least One Lowercase Letter")
							.matches(/[A-Z]/, "Password Must Contain at Least One Uppercase Letter"),

					newPassword:
						Yup
							.string()
							.required("Required")
							.min(8, "Password Must Contain From 8 to 16 Characters")
							.max(16, "Password Must Contain From 8 to 16 Characters")
							.matches(/[0-9]/, "Password Must Contain at Least One Number")
							.matches(/[a-z]/, "Password Must Contain at Least One Lowercase Letter")
							.matches(/[A-Z]/, "Password Must Contain at Least One Uppercase Letter"),

					newPasswordConfirmation:
						Yup
							.string()
							.required("Required")
							.oneOf([Yup.ref("newPassword"), null], "Passwords Must Match"),
				})}
				onSubmit={async (values, action) => {
					await handlePasswordSubmit(values)
					action.setSubmitting(false)
				}}
				onReset={() => {
					props.setModalState(false)
				}}
			>

				{/* Actual Formik Form Structure */}
				<Form className="p-2 text-black">
					<h1 className="text-2xl font-bold text-center m-10">Change Password</h1>

					<div id="Flex_Lay" className="flex flex-col justify-around min-h-[300px] min-w-[150px] md:min-w-[300px]">

						<div id="Form_Element_Old_Password" className="relative z-0 col-span-2 m-1">
							<Field name="oldPassword" type="password" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Old Password</label>
							<ErrorMessage name="oldPassword" />
						</div>

						<div id="Form_Element_New_Password" className="relative z-0 col-span-2 m-1">
							<Field name="newPassword" type="password" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">New Password</label>
							<ErrorMessage name="newPassword" />
						</div>

						<div id="Form_Element_New_Password_Confirmation" className="relative z-0 col-span-2 m-1">
							<Field name="newPasswordConfirmation" type="password" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Confirm New Password</label>
							<ErrorMessage name="newPasswordConfirmation" />
						</div>

					</div>

					<div className="flex flex-row items-center justify-around">
						<DismissButton />
						<SubmitButton title={"Change"} loading={loading}/>
					</div>

				</Form>

			</Formik>


			<div className="fixed bottom-32">
				<Alert visible={alertShown} type={alertType} message={alertMessage}/>
			</div>
		</>
	)
}

interface ModalProps {
	originalPassword: string;
	setModalState: (state: boolean) => void;
}
