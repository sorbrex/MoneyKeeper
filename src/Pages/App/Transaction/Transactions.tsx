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
import TransactionChart from "@Pages/App/Transaction/Components/TransactionChart"
import AddTransactionModalForm from "@Pages/App/Transaction/Components/AddTransactionModalForm"
import ErrorPage from "@Pages/Base/ErrorPages"
import CenteredContainer from "@/Layouts/CenteredContainer"
import DatePicker from "@UI/Complex/DatePicker"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"
import dayjs from "dayjs"
import Toggle from "@UI/Simple/Toggle"
import Axios from "axios"
import Alert from "@UI/Simple/Alert"
import {DateRange} from "react-day-picker"
import {subMonths} from "date-fns"
import isBetween from "dayjs/plugin/isBetween"
import TransactionList from "@UI/Complex/TransactionList"
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
	} = useGetTransactionsQuery({token:getAuth()})

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
					date: dayjs(transaction.createdAt).format("DD/MM/YYYY")
				})
				index = localNormalizedData.length - 1
			}

			//Expense or Income?
			if(showIncome && transaction.type === "income" || !showIncome && transaction.type === "expense") {
				//If Already Existing, Add Amount
				if (localNormalizedData[index][transaction.categoryId]) {
					localNormalizedData[index][transaction.categoryId] = localNormalizedData[index][transaction.categoryId] as number + transaction.amount
				} else {
					//If Not Existing, Create New Element
					localNormalizedData[index][transaction.categoryId] = transaction.amount
				}
			}
		})

		//Sort By Date from the oldest to the newest
		localNormalizedData.reverse()
		normalizedData.current = localNormalizedData.map((item: any) => {
			return {
				type: showIncome ? "income" : "expense",
				...item,
			}
		})
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

			{/*HEADER*/}
			<AppHeader username={accountInfo.name} page={document.title}/>

			<section id="Movements_Page" className="flex flex-col text-black bg-white overflow-y-auto">
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

					<div id="toggler" className="flex flex-row justify-center">
						<p className="mx-2">Expense</p>
						<Toggle active={showIncome} onToggle={() => setShowIncome(!showIncome)}/>
						<p className="mx-2">Income</p>
					</div>

					{/*GRAPHIC*/}
					<TransactionChart data={normalizedData.current} categoryList={categoryList}/>

					{/*USER INTERACTION*/}
					<div className="w-full flex flex-col items-center justify-center">
						<DatePicker onRangeSelected={handleChangeDateRange} range={range} />
						<ButtonPrimary content="Add New" onClick={() => setModalIsOpen(true)} />
					</div>


					{/*TRANSACTION LIST*/}
				<div className="max-h-[250px] overflow-y-auto">
					<TransactionList transaction={transactionList.current} categoryList={categoryList} editable={true} onEdit={handleEdit} onDelete={handleDelete} />
				</div>
				<div className="fixed bottom-32 w-full flex justify-center items-center">
					<div className="max-w-xl">
						<Alert visible={alertShown} type={alertType} message={alertMessage}/>
					</div>
				</div>

			</section>

			{/*FOOTER*/}
			<AppFooter />
		</>
	)
}
