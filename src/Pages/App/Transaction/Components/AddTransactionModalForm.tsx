import Axios from "axios"
import {BASE_URL, getAuth} from "@/Helpers/Helpers"
import React from "react"
import {AlertType, Category, CreateTransactionFormValues} from "@/Types/Types"
import Alert from "@UI/Simple/Alert"
import {ErrorMessage, Field, Form, Formik} from "formik"
import * as Yup from "yup"
import SubmitButton from "@UI/Simple/Buttons/SubmitButton"
import DismissButton from "@UI/Simple/Buttons/DismissButton"
import { AiOutlineCaretDown } from "react-icons/ai"

export default function AddTransactionModalForm(props: ModalProps) {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const [loading, setLoading] = React.useState(false)

	function showAlertHideModal() {
		setAlertShown(true)
		setTimeout(() => {
			setAlertShown(false)
			setLoading(false)
			setTimeout(() => {
				props.setModalState(false)
			}, 300)
		}, 2500)
	}

	async function handleTransactionSubmit (values: CreateTransactionFormValues) {
		setLoading(true)

		// Add New Transaction
		await Axios.post(
			`${BASE_URL}/app/createTransaction` || "",
			{
				...values,
			}, {
				headers: {
					"Authorization": `Bearer ${getAuth()}`,
					"Content-Type": "application/json"
				}
			})
			.then(response => {
				if (response.status.toString().includes("20")){
					setAlertType("success")
					setAlertMessage("Transaction Created!")
				} else {
					setAlertType("error")
					setAlertMessage(`Cannot Create the Transaction! ${response.data.message}`)
				}
			})
			.catch(error => {
				setAlertType("error")
				setAlertMessage(`Cannot Create the Transaction! ${error}`)
			}).finally(() => {
				showAlertHideModal()
			})
	}


	return (
		<>
			<Formik
				initialValues={{ name: "", description: "", amount: "", categoryId: "", type: "expense" }}
				validationSchema={Yup.object({
					name:
						Yup
							.string()
							.required("Required"),

					description:
						Yup
							.string(),

					amount:
						Yup
							.number()
							.required("Required"),

					categoryId:
						Yup
							.string()
							.required("Required"),

					type:
						Yup
							.string().matches(/(expense|income)/, "Invalid Type")
							.required("Required"),
				})}
				onSubmit={async (values, action) => {
					await handleTransactionSubmit(values)
					action.setSubmitting(false)
				}}
				onReset={() => props.setModalState(false)}
			>

				<Form className="p-2 text-black">
					<h1 className="text-2xl font-bold text-center m-10">Add Transaction</h1>

					<div id="Flex_Lay" className="flex flex-col justify-around min-h-[300px] min-w-[150px] md:min-w-[300px]">

						<div id="Form_Element_Name" className="relative z-0 col-span-2 m-1">
							<Field name="name" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Transaction Name</label>
							<ErrorMessage name="name" />
						</div>

						<div id="Form_Element_Description" className="relative z-0 col-span-2 m-1">
							<Field name="description" type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Description</label>
							<ErrorMessage name="description" />
						</div>

						<div id="Form_Element_Amount" className="relative z-0 col-span-2 m-1">
							<Field name="amount" type="number" placeholder=" " className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"/>
							<label className="text-[#9CA3AF] absolute top-0 left-0 -z-10 origin-[0] transform text-sm md:text-lg duration-300 -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-pureBlack peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ">Amount</label>
							<ErrorMessage name="amount" />
						</div>

						<div id="Form_Element_Category" className="relative z-0 col-span-2 m-1">
							<div className="relative">
								<Field name="categoryId" as="select" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0">
									<option value="" disabled>Select a Category</option>
									{props.categoryList.map((category: Category) => {
										return <option key={category.id} value={category.id} title={category.description}>{category.name}</option>
									})}
								</Field>
								<AiOutlineCaretDown className="absolute right-3 top-3 -z-10"/>
							</div>
							<ErrorMessage name="categoryId" />
						</div>

						<div id="Form_Element_Type" className="relative z-0 col-span-2 m-1">
							<div className="relative">
								<Field name="type" as="select" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0">
									<option value="expense">Expense</option>
									<option value="income">Income</option>
								</Field>
								<AiOutlineCaretDown className="absolute right-3 top-3 -z-10"/>
							</div>
							<ErrorMessage name="type" />
						</div>

					</div>

					<div className="flex flex-row items-center justify-around">
						<DismissButton />
						<SubmitButton title="Insert" loading={loading}/>
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
	categoryList: Array<Category>;
	setModalState: (state: boolean) => void;
}
