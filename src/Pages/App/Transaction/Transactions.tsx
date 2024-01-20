import React, {useEffect, useState, useLayoutEffect, useRef} from "react"
import {Auth, BASE_URL, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {
	AlertType,
	Category,
	CreateTransactionFormValues,
	NormalizedTransactionForChart,
	Transaction,
	User
} from "@/Types/Types"
import {useGetCategoryQuery, useGetTransactionsQuery, useGetUserQuery} from "@/Services/ServiceAPI"
import {useNavigate} from "react-router"
import ReactModal from "react-modal"
import TransactionChart from "@Pages/App/Transaction/Components/TransactionChart";
import AddTransactionModalForm from "@Pages/App/Transaction/Components/AddTransactionModalForm"
import ErrorPage from "@Pages/Base/ErrorPages"
import CenteredContainer from "@/Layouts/CenteredContainer"
import DatePicker from "@UI/Complex/DatePicker"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"
import CategoryIcon, {Icon} from "@UI/Simple/CategoryIcon"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import dayjs from "dayjs"
import Toggle from "@UI/Simple/Toggle";
import Axios from "axios";
import Alert from "@UI/Simple/Alert";
import {DateRange} from "react-day-picker";
import {subMonths} from "date-fns";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween)


const pastMonth = subMonths(new Date(), 1)
const defaultRange: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function Transactions() {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [showIncome, setShowIncome] = useState(false)
	const [range, setRange] = useState<DateRange>(defaultRange)
	const transactionList = useRef<Array<Transaction>>([])
	const normalizedData = useRef<any>()
	const navigate = useNavigate()
	const baseFormValues: CreateTransactionFormValues = {
		id: "",
		name: "",
		description: "",
		amount: "",
		categoryId: "",
		type: "expense",
	}
	const previousTransactionData = useRef<CreateTransactionFormValues>(baseFormValues)


	// Check Credentials Or Redirect
	useEffect(() => {
		document.title = "Transaction"
		Auth().catch(() => {
			navigate("/login")
		})
	}, [])
	if (!getAuth()) {
		return <Loading />
	}

	//Fetch User Data
	const {
		data: accountInfo = {} as User,
		isLoading: userIsLoading,
		isFetching: userIsFetching,
		isError: userIsError,
		error: userError,
	} = useGetUserQuery(getAuth())

	//Fetch Transaction Data
	const {
		data: remoteTransactionList = [] as Array<Transaction>,
		isLoading,
		isFetching,
		isError,
		error,
		refetch,
		isSuccess: isTransactionFetchSuccess,
	} = useGetTransactionsQuery(getAuth())

	// Get Categories
	const {
		data: categoryList = [] as Array<Category>,
	} = useGetCategoryQuery(getAuth())

	if (userIsLoading || isFetching || isLoading || userIsFetching) {
		return <Loading />
	} else if (isError || userIsError) {
		const realError = error || userError
		console.log({realError})
		return <ErrorPage message={JSON.stringify(realError)} />
	}
	if (isTransactionFetchSuccess) {
		transactionList.current = remoteTransactionList.toReversed().filter((transaction: Transaction) => {
			return dayjs(transaction.createdAt).isBetween(range.from as Date, range.to as Date)
		})
		normalizeTransactionDataForChart()
	}

	// Normalize Data For Chart
	function normalizeTransactionDataForChart () {
		const localNormalizedData: NormalizedTransactionForChart = []

		//Group By Date
		transactionList.current.forEach((transaction: Transaction) => {
			//Search for Already Existing Date
			let index = localNormalizedData.findIndex((item: any) => item.date === dayjs(transaction.createdAt).format("DD/MM/YYYY"))
			//If Not Found, Create New Element With Date
			if(index === -1) {
				localNormalizedData.push({
					date: dayjs(transaction.createdAt).format("DD/MM/YYYY"),
					transaction: {},
				})
				index = localNormalizedData.length - 1
			}

			//Expense or Income?
			if(showIncome && transaction.type === "income" || !showIncome && transaction.type === "expense") {
				//If Already Existing, Add Amount
				if (localNormalizedData[index].transaction?.[transaction.categoryId]) {
					localNormalizedData[index].transaction[transaction.categoryId] += transaction.amount
				} else {
					//If Not Existing, Create New Element
					localNormalizedData[index].transaction[transaction.categoryId] = transaction.amount
				}
			}
		})

		//Sort By Date from the oldest to the newest
		localNormalizedData.reverse()
		normalizedData.current = localNormalizedData.map((item: any) => {
			return {
				type: showIncome ? "income" : "expense",
				date: item.date,
				...item.transaction
			}
		})
	}

	function parseCategoryIcon (categoryId: string) {
		if (categoryList) {
			const icon: Icon = categoryList.filter((category: Category) => category.id === categoryId)[0]?.name as Icon
			return <CategoryIcon icon={icon} />
		} else {
			return <></>
		}
	}

	function handleChangeDateRange (range: DateRange | undefined) {
		if (range === undefined) return
		setRange(range)
	}

	function handleEdit (transactionId: string) {
		const transaction = remoteTransactionList.find((transaction: Transaction) => transaction.id === transactionId)
		previousTransactionData.current = {
			id: transaction?.id,
			name: transaction?.name,
			description: transaction?.description,
			amount: transaction?.amount.toString(),
			categoryId: transaction?.categoryId,
			type: transaction?.type,
		}
		//Show Modal and Fill Form with Transaction Data
		setModalIsOpen(true)
	}

	function handleDelete (transactionId: string) {
		//Delete Transaction
		if(confirm("Are you sure you want to delete this transaction?")) {
			const transaction = remoteTransactionList.find((transaction: Transaction) => transaction.id === transactionId)
			console.log({transaction})
			//Make Server Request To Delete Transaction
			Axios.delete(`${BASE_URL}/app/deleteTransaction`, {
				headers: {
					"Authorization": `Bearer ${getAuth()}`
				},
				data: {
					transactionId: transactionId
				}
			}).then(response => {
				if (response.status.toString().includes("20")){
					setAlertType("success")
					setAlertMessage("Transaction Deleted!")
				} else {
					setAlertType("error")
					setAlertMessage(`Cannot Delete Transaction! ${response.data.message}`)
				}
			})
				.catch(error => {
					setAlertType("error")
					setAlertMessage(`Cannot Delete Transaction! ${error}`)
				}).finally(() => {
				showAlertHideModal()
			})
		}
	}

	function showAlertHideModal() {
		setAlertShown(true)
		setTimeout(() => {
			setAlertShown(false)
		}, 2500)
	}

	return (
		<>
			<section id="Movements_Page" className="h-screen flex flex-col text-black bg-white overflow-y-auto">
				{/*MODAL*/}
				<ReactModal
					isOpen={modalIsOpen}
					onRequestClose={() => {previousTransactionData.current = baseFormValues; setModalIsOpen(false)}}
					onAfterClose={() => refetch()}
					contentLabel="Add Transaction"
					shouldCloseOnEsc={true}
					style={{content:{display: "flex", justifyContent: "center", alignItems: "center", height: "75%", width: "70%", margin: "auto"}}}
					appElement={document.getElementById("root") as HTMLElement}
				>
					<AddTransactionModalForm setModalState={ setModalIsOpen } categoryList={categoryList} presentData={previousTransactionData.current}/>
				</ReactModal>

				{/*HEADER*/}
				<AppHeader username={accountInfo.name} page={document.title}/>

				{/*BODY*/}
				<CenteredContainer>
					{/*GRAPHIC*/}
					<TransactionChart data={normalizedData.current} categoryList={categoryList}/>

					{/*USER INTERACTION*/}
					<div className="w-full flex flex-col items-center justify-center">
						<div className="flex flex-row justify-center">
							<p className="mx-2">Expense</p>
							<Toggle active={showIncome} onToggle={() => setShowIncome(!showIncome)}/>
							<p className="mx-2">Income</p>
						</div>
						<ButtonPrimary content="Add New" onClick={() => setModalIsOpen(true)} />
						<DatePicker onRangeSelected={handleChangeDateRange} range={range} />
					</div>

					{/*TRANSACTION LIST*/}
					<div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
						{transactionList.current.length === 0 && <h1 className="text-center text-gray-500 mt-16">No Transactions Found</h1>}
						{transactionList.current.map((transaction: Transaction) => {
							return (
								<div key={transaction.id} className="flex flex-row justify-between items-center m-2">
									<div className="flex flex-col items-start justify-center min-w-[150px] text-left w-[100px] md:w-[300px]">
										<h1 className="text-xl font-bold">{transaction.name}</h1>
										<p className="text-gray-500">{transaction.description}</p>
									</div>
									<div className="flex flex-col m-2">
										{parseCategoryIcon(transaction.categoryId)}
									</div>
									<div className="flex flex-col md:flex-row md:justify-between md:min-w-[300px]">
										<p className={`text-xl font-bold ${transaction.type === "expense" ? "text-contrastRed" : "text-contrastGreen"}`}>{transaction.type === "expense" ? "-" : "+"}{transaction.amount}&euro;</p>
										<p className="text-gray-500">{dayjs(transaction.createdAt).format("DD/MM/YYYY")}</p>
									</div>
									<div className="flex flex-col md:flex-row items-end md:items-center md:justify-around w-[100px]">
										<AiOutlineEdit className="text-2xl cursor-pointer" onClick={() => handleEdit(transaction.id)} />
										<AiOutlineDelete className="text-2xl text-contrastRed cursor-pointer" onClick={() => handleDelete(transaction.id)} />
									</div>
								</div>
							)
						})}
					</div>
				</CenteredContainer>

				<div className="fixed bottom-32">
					<Alert visible={alertShown} type={alertType} message={alertMessage}/>
				</div>

				{/*FOOTER*/}
				<AppFooter />
			</section>
		</>
	)
}
