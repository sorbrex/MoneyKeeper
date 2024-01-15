import React, {useEffect, useState} from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {Category, Transaction, User} from "@/Types/Types"
import {useGetCategoryQuery, useGetTransactionsQuery, useGetUserQuery} from "@/Services/ServiceAPI"
import {useNavigate} from "react-router"
import ReactModal from "react-modal"
import AddTransactionModalForm from "@Pages/App/Transaction/Components/AddTransactionModalForm"
import ErrorPage from "@Pages/Base/ErrorPages"
import CenteredContainer from "@/Layouts/CenteredContainer"
import DatePicker from "@UI/Complex/DatePicker"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"
import CategoryIcon, {Icon} from "@UI/Simple/CategoryIcon"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"

import dayjs from "dayjs"

export default function Transactions() {
	const [modalIsOpen, setModalIsOpen] = useState(false)

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
	}

	if (isError || userIsError) {
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
					<div><h1>Grafico Bello</h1></div>

					{/*USER INTERACTION*/}
					<div className="w-full flex flex-col items-center justify-center mt-8">
						<ButtonPrimary content="Add New" onClick={() => setModalIsOpen(true)} />
						<DatePicker/>
					</div>

					{/*TRANSACTION LIST*/}
					<div className="flex flex-col justify-around w-full mt-8">
						{transactionList.map((transaction: Transaction) => {
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
										<p className={`text-xl font-bold ${transaction.type === "expense" ? "text-contrastRed" : "text-contrastGreen"}`}>{transaction.type === "expense" ? "-" : "+"}{transaction.amount}</p>
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
