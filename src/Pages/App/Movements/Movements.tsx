import React, { useEffect, useState } from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import { useNavigate } from "react-router"
import AppHeader from "@UI/Complex/Header/AppHeader"
import AppFooter from "@UI/Complex/Footer/AppFooter"
import Loading from "@UI/Simple/Loading";
import {User} from "@/Types/Types";
import {useGetUserQuery} from "@/Services/ServiceAPI";

export default function Movements() {
	const navigate = useNavigate()
	
	useEffect(() => {
		document.title = "Transaction"
		Auth().catch((_) => {
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
	} = useGetUserQuery(getAuth());


	if (isLoading || isFetching) {
		return <Loading />
	}

	if (isError) {
		console.log({error});
		return <div>{JSON.stringify(error)}</div>;
	}


	return (
		<>
			<AppHeader username={accountInfo.name} page={document.title}/>
			{/*TODO: Should Fetch the Username from The Saved Session or Something*/}

			{/*<section id="Account_Section">*/}
			{/*	<Account />*/}
			{/*</section>*/}

			<AppFooter />
		</>
	)
}
