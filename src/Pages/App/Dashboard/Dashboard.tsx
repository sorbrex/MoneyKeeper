import React, { useEffect } from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {User} from "@/Types/Types"
import {useGetUserQuery} from "@/Services/ServiceAPI"
import {useNavigate} from "react-router"
import CenteredContainer from "@/Layouts/CenteredContainer"
import Title from "@UI/Simple/Typography/Title"
import Container from "@/Layouts/Container"

export default function Dashboard() {
	const navigate = useNavigate()
	const [cashAvailable, setCashAvailable] = React.useState(0)
	const [monthExpense, setMonthExpense] = React.useState(0)
	const [monthIncome, setMonthIncome] = React.useState(0)

	useEffect(() => {
		document.title = "Dashboard"
		Auth().catch(() => {
			navigate("/login")
		})
	}, [])

	if (!getAuth()) {
		return <Loading />
	}

	const {
		data: accountInfo = {} as User,
		isLoading,
		isFetching,
		isError,
		error,
	} = useGetUserQuery(getAuth())


	if (isLoading || isFetching) {
		return <Loading />
	}

	if (isError) {
		console.log({error})
		return <div>{JSON.stringify(error)}</div>
	}

	return (
		<>
			<AppHeader username={accountInfo.name} page={document.title}/>
			<section id="Dashboard_Page" className="text-black body-font">
				<div id="InternalLayout" className="w-full h-screen py-24 flex flex-col md:flex-row">
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
							<div id="ExpenseIncomeClusteredChart" className="border-2 border-blue-600 w-full">


								<div id="UserInteraction">
									{/*Category Row*/}
									{/*Date Picker*/}
									<div id="UserInteraction_Filter" className="border-2 w-full">
										<p>UserInteraction_Filter</p>
									</div>

									{/*Date Shortcuts*/}
									{/*Range Expenses - Incomes*/}
									<div id="UserInteraction_DefaultRange" className="border-2 w-full">
										<p>UserInteraction_DefaultRange</p>
									</div>
								</div>

								{/*Column Clustered Chart*/}
								<div id="ExpenseIncomeClusteredChart_Chart" className="border-2 w-full">
									<p>ExpenseIncomeClusteredChart_Chart</p>
								</div>

							</div>

							{/*Pie Chart Ever Categories Expenses*/}
							<div id="CategoryPieChart" className="border-2 w-full">
								<p>CategoryPieChart</p>
							</div>
						</div>

						{/*Transactions List*/}
						<div id="TransactionList" className="border-2 w-full">
							<p>Transactions</p>
						</div>
					</div>
				</div>
			</section>
			<AppFooter />
		</>
	)
}
