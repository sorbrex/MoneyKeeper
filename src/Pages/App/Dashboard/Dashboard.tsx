import React, {useEffect, useState} from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import Loading from "@UI/Simple/Loading"
import {
	Category,
	RequestStatus,
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
import CategoryPieChart from "@Pages/App/Dashboard/Components/CategoryPieChart"
import ClusteredChart from "@Pages/App/Dashboard/Components/ClusteredChart"

const pastMonth = subMonths(new Date(), 1)
const defaultRange: DateRange = {
	from: pastMonth,
	to: new Date()
}

export default function Dashboard() {
	const navigate = useNavigate()
	const [cashAvailable, setCashAvailable] = useState(0)
	const [monthExpense, setMonthExpense] = useState(0)
	const [monthIncome, setMonthIncome] = useState(0)
	const [range, setRange] = useState<DateRange | undefined>(defaultRange)
	const [defaultRangeSelected, setDefaultRangeSelected] = useState("1M")
	const [transactionList, setTransactionList] = useState<Array<Transaction>>([])
	const [dataFetchedStatus, setDataFetchedStatus] = useState<RequestStatus>("idle")

	//Fetch User Data
	const {
		data: accountInfo = {} as User,
		isError: userIsError,
		error: userError,
	} = useGetUserQuery(getAuth())

	//Fetch Transaction Data
	const {
		data: remoteTransactionList = [] as Array<Transaction>,
		isError: transactionIsError,
		error: transactionError,
	} = useGetTransactionsQuery({token: getAuth()})

	// Get Categories
	const {
		data: categoryList = [] as Array<Category>,
	} = useGetCategoryQuery(getAuth())

	useEffect(() => {
		setDataFetchedStatus("good")
		if (remoteTransactionList.length > 0) {
			let localTransactionList = remoteTransactionList.toReversed()
			if (range) {
				localTransactionList = localTransactionList.filter((transaction: Transaction) => {
					return dayjs(transaction.createdAt).isBetween(range.from as Date, range.to as Date, 'day','[]')
				})
			}
			setTransactionList(localTransactionList)
		}
	}, [remoteTransactionList, range])

	useEffect(() => {
		retrieveGeneralCashInfo()
	}, [remoteTransactionList])

	useEffect(() => {
		if ((transactionIsError && transactionError) || (userIsError && userError)) {
			setDataFetchedStatus("error")
		}
	}, [transactionIsError, userIsError])

	useEffect(() => {
		document.title = "Dashboard"
		Auth().catch(() => {
			navigate("/login")
		})
	}, [])

	if (!getAuth() || dataFetchedStatus === "running") {
		return <Loading />
	}

	// Error Handling Page
	if (dataFetchedStatus === "error") {
		if (userIsError && userError) {
			console.error("Dashboard User Error => ", userError)
			return <ErrorPage message={JSON.stringify(userError)} />
		}
		if (transactionIsError && transactionError) {
			console.error("Dashboard Transaction Error => ", transactionError)
			return <ErrorPage message={JSON.stringify(transactionError)} />
		}
	}

	function retrieveGeneralCashInfo () {
		if (!remoteTransactionList) return

		const filteredTransactionList = remoteTransactionList.filter((transaction: Transaction) => {
			return dayjs(transaction.createdAt).isBetween(dayjs().subtract(1, "month"), dayjs(), 'day','[]')
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
			<section id="Dashboard_Page" className="text-black body-font bg-white">
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
					<div id="DashboardContent" className="w-full flex flex-col justify-center items-center">


						{/*Charts*/}
						<div id="Charts" className="w-full flex flex-col xl:flex-row">

							{/*Column Clustered Chart Expenses - Incomes Filtered*/}
							<div id="ExpenseIncomeClusteredChart" className="w-full flex flex-col justify-center items-center">
								<div className="w-full items-center mb-4 justify-start">
									<h1 className="text-center md:text-left text-4xl">Expenses & Incomes:</h1>
								</div>

								{/*Column Clustered Chart*/}
								<div id="ExpenseIncomeClusteredChart_Chart" className="w-full p-4 md:min-h-[300px] flex justify-center items-end">
									{transactionList && <ClusteredChart data={transactionList}/>}
								</div>
							</div>

							{/*Pie Chart Ever Categories Expenses*/}
							<div id="CategoryPieChart" className="w-full flex flex-col justify-center items-center ">
								<div className="w-full items-center justify-start">
									<h1 className="text-center md:text-left text-4xl">Expenses By Category:</h1>
								</div>
								<div className="w-full mt-8 h-[400px]">
									{transactionList && <CategoryPieChart data={transactionList} categoryList={categoryList}/>}
								</div>
							</div>
						</div>

						{/*Range Expenses - Incomes*/}
						<hr className="w-full my-8"/>
						<div id="UserInteraction_DefaultRange" className="w-full max-w-xl flex justify-around items-center">
							<button type="button" onClick={()=>handleChangeDateRange("1D")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1D") && "border-2 border-softBlack"}`}>1D</button>
							<button type="button" onClick={()=>handleChangeDateRange("1W")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1W") && "border-2 border-softBlack"}`}>1W</button>
							<button type="button" onClick={()=>handleChangeDateRange("1M")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1M") && "border-2 border-softBlack"}`}>1M</button>
							<button type="button" onClick={()=>handleChangeDateRange("3M")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("3M") && "border-2 border-softBlack"}`}>3M</button>
							<button type="button" onClick={()=>handleChangeDateRange("1Y")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("1Y") && "border-2 border-softBlack"}`}>1Y</button>
							<button type="button" onClick={()=>handleChangeDateRange("0")} className={`w-[50px] h-[25px] bg-gray-300 rounded shadow ${defaultRangeSelected.includes("ALL") && "border-2 border-softBlack"}`}>ALL</button>
						</div>

						{/*Transactions List*/}
						<div id="TransactionList" className="w-full mt-8 mb-8">
							<h1 className="text-center md:text-left text-4xl">Last Transactions:</h1>
							<TransactionList transaction={transactionList?.slice(-2)} categoryList={categoryList} />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
