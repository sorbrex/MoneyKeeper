import React, {useEffect, useRef, useState} from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {
	Category,
	NormalizedTransactionForChart,
	Transaction,
	User
} from "@/Types/Types"
import {useGetCategoryQuery, useGetTransactionsQuery, useGetUserQuery} from "@/Services/ServiceAPI"
import {useNavigate} from "react-router"
import TransactionList from "@UI/Complex/TransactionList"
import ErrorPage from "@Pages/Base/ErrorPages"
import dayjs from "dayjs"
import {DateRange} from "react-day-picker"
import {subMonths} from "date-fns"
import ClusteredChart from "@Pages/App/Dashboard/Components/ClusteredChart";
const pastMonth = subMonths(new Date(), 1)
const defaultRange: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function Dashboard() {
	const navigate = useNavigate()
	const [selectedCategories, setSelectedCategories] = useState<Array<string>>(["Hobby"])
	const [cashAvailable, setCashAvailable] = React.useState(0)
	const [monthExpense, setMonthExpense] = React.useState(0)
	const [monthIncome, setMonthIncome] = React.useState(0)
	const [showIncome, setShowIncome] = useState(false)
	const [range, setRange] = useState<DateRange | undefined>(defaultRange)
	const transactionList = useRef<Array<Transaction>>([])
	const normalizedData = useRef<any>()

	useEffect(() => {
		document.title = "Dashboard"
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
		isSuccess: isTransactionFetchSuccess,
	} = useGetTransactionsQuery({token: getAuth()})

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
		transactionList.current = remoteTransactionList.toReversed()
		if (range) {
			transactionList.current.filter((transaction: Transaction) => {
				return dayjs(transaction.createdAt).isBetween(range.from as Date, range.to as Date)
			})
		}
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
			if(transaction.type === "income") {
				//If Already Existing, Add Amount
				if (localNormalizedData[index].transaction?.["income_" + transaction.categoryId]) {
					localNormalizedData[index].transaction["income_" + transaction.categoryId] += transaction.amount
				} else {
					//If Not Existing, Create New Element
					localNormalizedData[index].transaction["income_" + transaction.categoryId] = transaction.amount
				}
			} else {
				//If Already Existing, Add Amount
				if (localNormalizedData[index].transaction?.["expense_" + transaction.categoryId]) {
					localNormalizedData[index].transaction["expense_" + transaction.categoryId]  += transaction.amount
				} else {
					//If Not Existing, Create New Element
					localNormalizedData[index].transaction["expense_" + transaction.categoryId]  = transaction.amount
				}
			}
		})

		//Sort By Date from the oldest to the newest
		localNormalizedData.reverse()
		normalizedData.current = localNormalizedData.map((item: any) => {
			return {
				date: item.date,
				...item.transaction
			}
		})
	}

	function handleChangeDateRange (newRange: string) {
		switch (newRange) {
			case "1D":
				setRange({
					from: dayjs().subtract(1, "day").toDate(),
					to: new Date()
				})
				break
			case "1W":
				setRange({
					from: dayjs().subtract(1, "week").toDate(),
					to: new Date()
				})
				break
			case "1M":
				setRange({
					from: dayjs().subtract(1, "month").toDate(),
					to: new Date()
				})
				break
			case "3M":
				setRange({
					from: dayjs().subtract(3, "month").toDate(),
					to: new Date()
				})
				break
			case "1Y":
				setRange({
					from: dayjs().subtract(1, "year").toDate(),
					to: new Date()
				})
				break
			case "0":
				setRange(undefined)
				break
		}
	}

	return (
		<>
			<AppHeader username={accountInfo.name} page={document.title}/>
			<section id="Dashboard_Page" className="text-black body-font">
				<div id="InternalLayout" className="w-full h-screen py-24 px-4 flex flex-col md:flex-row">
					<div id="Sidebar" className="w-full md:max-w-[200px] lg:max-w-[300px]">
						<div id="Available" className="w-full my-4">
							<h4 className="text-center md:text-left">Cash Available:</h4>
							<p className="w-full text-center text-lg font-bold my-2">{cashAvailable} &euro;</p>
						</div>
						<div id="MonthExpense" className="w-full my-4">
							<h4 className="text-center md:text-left">Last Month Expense:</h4>
							<p className="w-full text-center text-lg font-bold my-2">{monthExpense} &euro;</p>
						</div>
						<div id="MonthIncome" className="w-full my-4">
							<h4 className="text-center md:text-left">Last Month Income:</h4>
							<p className="w-full text-center text-lg font-bold my-2">{monthIncome} &euro;</p>
						</div>
					</div>
					<div id="DashboardContent" className="w-full">

						{/*Charts*/}
						<div id="Charts" className="md:flex">

							{/*Column Clustered Chart Expenses - Incomes Filtered*/}
							<div id="ExpenseIncomeClusteredChart" className="w-full">

								{/*Range Expenses - Incomes*/}
								<div id="UserInteraction_DefaultRange" className="w-full flex justify-around items-center">
									<button type="button" onClick={()=>handleChangeDateRange("1D")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">1D</button>
									<button type="button" onClick={()=>handleChangeDateRange("1W")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">1W</button>
									<button type="button" onClick={()=>handleChangeDateRange("1M")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">1M</button>
									<button type="button" onClick={()=>handleChangeDateRange("3M")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">3M</button>
									<button type="button" onClick={()=>handleChangeDateRange("1Y")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">1Y</button>
									<button type="button" onClick={()=>handleChangeDateRange("0")} className="w-[50px] h-[25px] bg-gray-300 rounded shadow">ALL</button>
								</div>

								{/*Column Clustered Chart*/}
								<div id="ExpenseIncomeClusteredChart_Chart" className="w-full">
									<ClusteredChart data={normalizedData.current} categoryList={categoryList} />
								</div>
							</div>

							{/*Pie Chart Ever Categories Expenses*/}
							<div id="CategoryPieChart" className="border-2 w-full">
								Category Pie
							</div>

						</div>

						{/*Transactions List*/}
						<div id="TransactionList" className="border-2 w-full">
							<TransactionList transaction={transactionList.current.slice(-2)} categoryList={categoryList} />
						</div>
					</div>
				</div>
			</section>
			<AppFooter />
		</>
	)
}
