import React, {useEffect, useState, useLayoutEffect, useRef} from "react"
import {Auth, BASE_URL, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {Category, NormalizedTransactionForChart, Transaction, User} from "@/Types/Types"
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


export default function Transactions() {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [showIncome, setShowIncome] = useState(false)
	const normalizedData = useRef<any>()
	const navigate = useNavigate()

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
		normalizeTransactionDataForChart()
	}

	// Normalize Data For Chart
	function normalizeTransactionDataForChart (list: Array<Transaction> = remoteTransactionList) {
		let localNormalizedData: NormalizedTransactionForChart = []

		//Group By Date
		list.forEach((transaction: Transaction) => {
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
		localNormalizedData.sort((a, b) => {
			return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
		})

		normalizedData.current = localNormalizedData.map((item: any) => {
			return {
				type: showIncome ? "income" : "expense",
				date: item.date,
				...item.transaction
			}
		})

		console.log({normalizedData: normalizedData.current})
	}

	function parseCategoryIcon (categoryId: string) {
		if (categoryList) {
			const icon: Icon = categoryList.filter((category: Category) => category.id === categoryId)[0]?.name as Icon
			return <CategoryIcon icon={icon} />
		} else {
			return <></>
		}
	}

	function handleEdit (transactionId: string) {
		const transaction = remoteTransactionList.find((transaction: Transaction) => transaction.id === transactionId)
		//Show Modal and Fill Form with Transaction Data
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
			}).then(() => {
					//If Success, Refetch Data
					console.log("Success")
					refetch()
				}).catch((error) => {
					//If Error, Show Error
					console.log("Error", error)
				}).finally(()=>{
					//In Any Case, Close Modal
					console.log("Finally")
				})
		}
	}




	return (
		<>
			<section id="Movements_Page" className="h-screen flex flex-col text-black bg-white">
				{/*MODAL*/}
				<ReactModal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					onAfterClose={() => refetch()}
					contentLabel="Add Transaction"
					shouldCloseOnEsc={true}
					style={{content:{display: "flex", justifyContent: "center", alignItems: "center", height: "75%", width: "70%", margin: "auto"}}}
					appElement={document.getElementById("root") as HTMLElement}
				>
					<AddTransactionModalForm setModalState={ setModalIsOpen } categoryList={categoryList}/>
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
						<DatePicker/>
					</div>

					{/*TRANSACTION LIST*/}
					<div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
						{remoteTransactionList.toReversed().map((transaction: Transaction) => {
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

				{/*FOOTER*/}
				<AppFooter />
			</section>
		</>
	)
}
