import React, {useEffect, useState} from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {
	Category, NormalizedCategoryForChart,
	NormalizedTransactionForChart, RequestStatus,
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
import OriginalChartFromDemo from "@Pages/App/Dashboard/Components/OriginalChartFromDemo";
import CategoryPieChart from "@Pages/App/Dashboard/Components/CategoryPieChart";
const pastMonth = subMonths(new Date(), 1)
const defaultRange: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function Dashboard() {
	const navigate = useNavigate()
	const [cashAvailable, setCashAvailable] = React.useState(0)
	const [monthExpense, setMonthExpense] = React.useState(0)
	const [monthIncome, setMonthIncome] = React.useState(0)
	const [range, setRange] = useState<DateRange | undefined>(defaultRange)
	const [defaultRangeSelected, setDefaultRangeSelected] = useState("1M")
	const [transactionList, setTransactionList] = useState<Array<Transaction> | null>()
	const [dataFetched, setDataFetched] = useState<RequestStatus>("idle")
	const [normalizedTransactionData, setNormalizedTransactionData] = useState<NormalizedTransactionForChart>()
	const [normalizedCategoryData, setNormalizedCategoryData] = useState<NormalizedCategoryForChart>()

	//Fetch User Data
	const {
		data: accountInfo = {} as User,
		isError: userIsError,
		error: userError,
	} = useGetUserQuery(getAuth())

	//Fetch Transaction Data
	const {
		data: remoteTransactionList = [] as Array<Transaction>,
		isError,
		error,
	} = useGetTransactionsQuery({token: getAuth()})

	// Get Categories
	const {
		data: categoryList = [] as Array<Category>,
	} = useGetCategoryQuery(getAuth())

	useEffect(() => {
		if (remoteTransactionList.length > 0) {
			setDataFetched("good")
			const localTransactionList = remoteTransactionList.toReversed()
			setTransactionList(localTransactionList)
			if (range) {
				setTransactionList(localTransactionList.filter((transaction: Transaction) => {
					return dayjs(transaction.createdAt).isBetween(range.from as Date, range.to as Date)
				}))
			}
		}
	}, [remoteTransactionList, range]);

	useEffect(() => {
		retrieveGeneralCashInfo()
		normalizeTransactionDataForClusteredChart()
		normalizeTransactionDataForPieChart()
	}, [transactionList]);

	useEffect(() => {
		setDataFetched("error")
	}, [isError, userIsError]);

	useEffect(() => {
		document.title = "Dashboard"
		Auth().catch(() => {
			navigate("/login")
		})
	}, [])

	if (!getAuth() || dataFetched === "running") {
		return <Loading />
	}

	if (dataFetched === "error") {
		const realError = error || userError
		return <ErrorPage message={JSON.stringify(realError)} />
	}

	// Normalize Data For Chart
	function normalizeTransactionDataForClusteredChart () {
		if (!transactionList) return

		const localNormalizedData: NormalizedTransactionForChart = []

		transactionList.forEach((transaction: Transaction) => {
			let index = localNormalizedData.findIndex((item: any) => item["date"] === dayjs(transaction.createdAt).format("DD/MM/YYYY"))
			if(index === -1) {
				localNormalizedData.push({
					date: dayjs(transaction.createdAt).format("DD/MM/YYYY")
				})
				index = localNormalizedData.length - 1
			}

			if(transaction.type === "income") {
				if (localNormalizedData[index]["income_" + transaction.categoryId]) {
					localNormalizedData[index]["income_" + transaction.categoryId] = localNormalizedData[index]["income_" + transaction.categoryId] as number + transaction.amount
				} else {
					localNormalizedData[index]["income_" + transaction.categoryId] = transaction.amount
				}
			} else {
				if (localNormalizedData[index]["expense_" + transaction.categoryId]) {
					localNormalizedData[index]["expense_" + transaction.categoryId] = localNormalizedData[index]["expense_" + transaction.categoryId] as number + transaction.amount
				} else {
					localNormalizedData[index]["expense_" + transaction.categoryId]  = transaction.amount
				}
			}
		})

		//Sort By Date from the oldest to the newest
		localNormalizedData.reverse()
		console.log("Normalized Data: ", localNormalizedData)
		setNormalizedTransactionData(localNormalizedData)
	}

	function normalizeTransactionDataForPieChart () {
		if (!transactionList) return

		const filteredTransactionList = transactionList.filter((transaction: Transaction) => {
			return transaction.type !== "income"
		})

		const localNormalizedData: NormalizedCategoryForChart = []

		filteredTransactionList.forEach((transaction: Transaction) => {
			const categoryName = categoryList.find((category: Category) => category.id === transaction.categoryId)?.name || "Expense"

			let index = localNormalizedData.findIndex((item: any) => item["category"] === transaction.name)

			if (index === -1) {
				localNormalizedData.push({
					category: categoryName,
					amount: transaction.amount
				})
			} else {
				if (localNormalizedData[index as unknown as number]) {
					localNormalizedData[index].amount += transaction.amount
				} else {
					localNormalizedData[index].amount = transaction.amount
				}
			}
		})

		console.log("Normalized Data For Category Pie: ", localNormalizedData)
		setNormalizedCategoryData(localNormalizedData)
	}

	function retrieveGeneralCashInfo () {
		if (!transactionList) return

		const filteredTransactionList = transactionList.filter((transaction: Transaction) => {
			return dayjs(transaction.createdAt).isBetween(dayjs().subtract(1, "month"), dayjs())
		})

		let totalExpense = 0
		let totalIncome = 0
		filteredTransactionList.forEach((transaction: Transaction) => {
			if (transaction.type === "expense") {
				totalExpense += transaction.amount
			} else {
				totalIncome += transaction.amount
			}
		})
		setMonthExpense(totalExpense)
		setMonthIncome(totalIncome)
		setCashAvailable(totalIncome - totalExpense)
	}

	function handleChangeDateRange (newRange: string) {
		switch (newRange) {
			case "1D":
				setRange({
					from: dayjs().subtract(1, "day").toDate(),
					to: new Date()
				})
				setDefaultRangeSelected("1D")
				break
			case "1W":
				setRange({
					from: dayjs().subtract(1, "week").toDate(),
					to: new Date()
				})
				setDefaultRangeSelected("1W")
				break
			case "1M":
				setRange({
					from: dayjs().subtract(1, "month").toDate(),
					to: new Date()
				})
				setDefaultRangeSelected("1M")
				break
			case "3M":
				setRange({
					from: dayjs().subtract(3, "month").toDate(),
					to: new Date()
				})
				setDefaultRangeSelected("3M")
				break
			case "1Y":
				setRange({
					from: dayjs().subtract(1, "year").toDate(),
					to: new Date()
				})
				setDefaultRangeSelected("1Y")
				break
			case "0":
				setRange(undefined)
				setDefaultRangeSelected("ALL")
				break
		}
	}

	return (
		<>
			<AppHeader username={accountInfo.name} page={document.title}/>
			<section id="Dashboard_Page" className="text-black body-font">
				<div id="InternalLayout" className="w-full px-4 flex flex-col md:flex-row">
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
						<div id="Charts" className="flex flex-col xl:flex-row">

							{/*Column Clustered Chart Expenses - Incomes Filtered*/}
							<div id="ExpenseIncomeClusteredChart" className="w-full flex flex-col justify-center items-center">
								<div className="w-full items-center mb-4 justify-start">
									<h1 className="text-center md:text-left text-4xl">Expenses & Incomes:</h1>
								</div>

								{/*Range Expenses - Incomes*/}
								<div id="UserInteraction_DefaultRange" className="w-full max-w-xl xl:h-24 flex justify-around items-center">
									<button type="button" onClick={()=>handleChangeDateRange("1D")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1D") && "border-2 border-softBlack"}`}>1D</button>
									<button type="button" onClick={()=>handleChangeDateRange("1W")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1W") && "border-2 border-softBlack"}`}>1W</button>
									<button type="button" onClick={()=>handleChangeDateRange("1M")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1M") && "border-2 border-softBlack"}`}>1M</button>
									<button type="button" onClick={()=>handleChangeDateRange("3M")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("3M") && "border-2 border-softBlack"}`}>3M</button>
									<button type="button" onClick={()=>handleChangeDateRange("1Y")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1Y") && "border-2 border-softBlack"}`}>1Y</button>
									<button type="button" onClick={()=>handleChangeDateRange("0")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("ALL") && "border-2 border-softBlack"}`}>ALL</button>
								</div>

								{/*Column Clustered Chart*/}
								<div id="ExpenseIncomeClusteredChart_Chart" className="w-full min-h-[400px] flex justify-center items-end">
									<ClusteredChart chartId="ClusteredChart" data={normalizedTransactionData} categoryList={categoryList} />
								</div>
							</div>

							{/*Pie Chart Ever Categories Expenses*/}
							<div id="CategoryPieChart" className="w-full flex flex-col justify-center items-center">
								<div className="w-full items-center justify-start">
									<h1 className="text-center md:text-left xl:mt-0 text-4xl">Expenses By Category:</h1>
								</div>
								{/*<CategoryPieChart chartId="CategoryPie" data={normalizedCategoryData} categoryList={categoryList} />*/}
							</div>

						</div>

						{/*Transactions List*/}
						<div id="TransactionList" className="w-full mt-8 mb-8">
							<h1 className="text-center md:text-left text-4xl">Last Transactions:</h1>
							<TransactionList transaction={transactionList?.slice(-2)} categoryList={categoryList} />
						</div>
					</div>
				</div>
			</section>
			<AppFooter />
		</>
	)
}
