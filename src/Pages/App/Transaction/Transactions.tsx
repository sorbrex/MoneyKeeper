import React, {useEffect, useState, useLayoutEffect} from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
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


// Reference Object for Transaction Chart
// {
// 	date: "01/01/2024",
// 		expense: [
// 	{
// 		"category":"Home",
// 		"amount": 129
// 	},
// 	{
// 		"category":"Food",
// 		"amount": 12
// 	},
// 	{
// 		"category":"Car",
// 		"amount": 873
// 	},
// 	{
// 		"category":"Health",
// 		"amount": 54
// 	}
// ],
// 	income: [
// 	{
// 		"category":"Work",
// 		"amount": 1649
// 	},
// ]
// }


function normalizeTransactionDataForChart (data: Array<Transaction>, showExpense: boolean) {
	let normalizedData: NormalizedTransactionForChart = []

	//Group By Date
	data.forEach((transaction: Transaction) => {
		//Search for Already Existing Date
		let index = normalizedData.findIndex((item: any) => item.date === dayjs(transaction.createdAt).format("DD/MM/YYYY"))
		//If Not Found, Create New Element With Date
		if(index === -1) {
			normalizedData.push({
				date: dayjs(transaction.createdAt).format("DD/MM/YYYY"),
				transaction: {},
			})
			index = normalizedData.length - 1
		}

		//Expense or Income?
		if(showExpense && transaction.type === "expense" || !showExpense && transaction.type === "income") {
			//If Already Existing, Add Amount
			if (normalizedData[index].transaction?.[transaction.categoryId]) {
				normalizedData[index].transaction[transaction.categoryId] += transaction.amount
			} else {
				//If Not Existing, Create New Element
				normalizedData[index].transaction[transaction.categoryId] = transaction.amount
			}
		}
	})

	//Sort By Date
	normalizedData.sort((a, b) => {
		return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
	})

	return normalizedData.map((item: any) => {
		return {
			date: item.date,
			...item.transaction
		}
	})
}

export default function Transactions() {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [showExpense, setShowExpense] = useState(true)
	const [normalizedData, setNormalizedData] = useState<NormalizedTransactionForChart>([])
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
		data: transactionList = [] as Array<Transaction>,
		isLoading,
		isFetching,
		isError,
		error,
		refetch
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


	function parseCategoryIcon (categoryId: string) {
		if (categoryList) {
			const icon: Icon = categoryList.filter((category: Category) => category.id === categoryId)[0]?.name as Icon
			return <CategoryIcon icon={icon} />
		} else {
			return <></>
		}
	}

	function handleChartToggle () {
		setShowExpense(!showExpense)
		console.log("Am i Showing Expense ?" + !showExpense)
		setNormalizedData(normalizeTransactionDataForChart(transactionList, showExpense))
		console.log(normalizedData)
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
					<TransactionChart data={normalizedData} categoryList={categoryList}/>

					{/*USER INTERACTION*/}
					<div className="w-full flex flex-col items-center justify-center">
						<Toggle active={showExpense} onToggle={handleChartToggle}/>
						<ButtonPrimary content="Add New" onClick={() => setModalIsOpen(true)} />
						<DatePicker/>
					</div>

					{/*TRANSACTION LIST*/}
					<div className="flex flex-col w-full max-h-[300px] mt-8 overflow-y-auto">
						{transactionList.toReversed().map((transaction: Transaction) => {
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
										<AiOutlineEdit className="text-2xl cursor-pointer" onClick={() => console.log("Modifica")} />
										<AiOutlineDelete className="text-2xl text-contrastRed cursor-pointer" onClick={() => console.log("Cancella")} />
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
