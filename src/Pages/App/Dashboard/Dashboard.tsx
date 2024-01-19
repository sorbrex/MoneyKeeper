import React, { useEffect } from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading"
import {User} from "@/Types/Types"
import {useGetUserQuery} from "@/Services/ServiceAPI"
import {useNavigate} from "react-router"

export default function Dashboard() {
	const navigate = useNavigate()

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

			<AppFooter />
		</>
	)
}
