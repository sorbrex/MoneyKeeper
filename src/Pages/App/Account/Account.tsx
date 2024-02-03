import React, { useEffect } from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"
import ProfilePicture from "@Pages/App/Account/Components/ProfilePicture"
import { AiOutlineLogout, AiOutlineDelete } from "react-icons/ai"
import Title from "@UI/Simple/Typography/Title"
import AccountInfoLabel from "@Pages/App/Account/Components/AccountInfoLabel"
import {useGetUserQuery} from "@/Services/ServiceAPI"
import {Auth, BASE_URL, getAuth} from "@/Helpers/Helpers"
import {User} from "@/Types/Types"
import Loading from "@UI/Simple/Loading"
import AppHeader from "@UI/Complex/Header/AppHeader"
import {useNavigate} from "react-router"
import AccountPasswordLabel from "@Pages/App/Account/Components/AccountPasswordLabel"
import Axios from "axios"
import {ErrorMessage} from "formik"

export default function Account() {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = "Account"
		Auth().catch(() => {
			navigate("/login")
		})
	}, [])

	if (!getAuth()) {
		return <Loading />
	}

	const {
		data: accountInfo = {} as User,
		refetch,
		isLoading,
		isFetching,
		isError,
		error,
	} = useGetUserQuery(getAuth())

	if (isLoading || isFetching) {
		return <Loading />
	}

	if (isError) {
		console.error({error})
		return <ErrorMessage name={JSON.stringify(error)} />
	}

	function updateAccountInfo() {
		refetch()
	}

	function handleLogout() {
		sessionStorage.removeItem("users-jwt")
		navigate("/login")
	}

	function handleAccountDeletion() {
		console.warn("Deleting Account From Server...")
		if (confirm("Are you sure you want to delete your account?\n All your data will be lost!")) {
			Axios.delete(`${BASE_URL}/app/deleteUser`,{
				headers: {
					Authorization: `Bearer ${getAuth()}`,
				},
			}).then(() => {
				alert("Account Deleted!")
				sessionStorage.removeItem("users-jwt")
				navigate("/login")
			}).catch((err) => {
				console.error(err)
				alert("Something went wrong!")
			})
		} else {
			console.log("Cancelled")
		}
	}



	return (
		<>
			<section id="Account_Page" className="flex flex-col bg-white text-black">

				<AppHeader username={accountInfo.name} page={document.title}/>

				<CenteredContainer>
					<div className="rounded-2xl mx-auto w-full flex max-w-sm md:max-w-3xl lg:max-w-5xl flex-col md:flex-row shadow-xl">

						{/*Breakpoint Usage => lg:bg-red --> From LG (1024px) and Above set Background Red*/}

						<div id="Account_Sidebar" className="p-4 bg-black text-white flex flex-col items-center justify-between w-full md:w-1/4 min-h-[300px] md:min-h-[500px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none">

							<div>
								<ProfilePicture source={accountInfo.remoteImageUrl} updatePic={updateAccountInfo}/>
								<h1 className="text-2xl mt-2">{accountInfo.name} {accountInfo.surname}</h1>
							</div>

							<div className="flex flex-row items-center justify-between w-full">
								<div className="flex flex-row items-center justify-center md:justify-start w-full cursor-pointer" onClick={handleLogout}>
									<AiOutlineLogout />
									<h3 className="p-2">Log Out</h3>
								</div>
								<div>
									<AiOutlineDelete className="text-xl text-contrastRed cursor-pointer" onClick={handleAccountDeletion}/>
								</div>
							</div>

						</div>

						<div id="Account_Info" className="w-full md:w-3/4 flex flex-col items-center md:items-start justify-start rounded-b-xl md:rounded-r-xl bg-pageGray text-black p-8">

							<Title title="Account Info"/>

							<div id="Top_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
								<AccountInfoLabel content={accountInfo.name} type="text"/>
								<AccountInfoLabel content={accountInfo.surname} type="text"/>
							</div>

							<div id="Bottom_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
								<AccountInfoLabel content={accountInfo.email} type="email"/>
								<AccountPasswordLabel originalPassword={accountInfo.password} updatePassword={updateAccountInfo}/>
							</div>

						</div>

					</div>
				</CenteredContainer>
			</section>

		</>
	)
}
