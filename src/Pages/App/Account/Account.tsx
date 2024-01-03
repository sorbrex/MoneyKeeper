import React, { useEffect } from "react"
import {Auth, getAuth} from "@/Helpers/Helpers"
import { useNavigate } from "react-router"
// import AppHeader from "@UI/Complex/Header/AppHeader"
// import AppFooter from "@UI/Complex/Footer/AppFooter"
// import {useGetUserQuery} from "@/Services/ServiceAPI";

export default function Account() {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = "Account"
		Auth().catch((err) => {
			console.log(err)
			navigate("/login")
		})
	}, [])
	//
	// const {
	// 	data: user,
	// 	isLoading,
	// 	isFetching,
	// 	isError,
	// 	error,
	// } = useGetUserQuery(getAuth());
	//
	// if (isLoading || isFetching) {
	// 	return <div>Loading...</div>;
	// }
	//
	// if (isError) {
	// 	console.log({ error });
	// 	return <div>{JSON.stringify(error)}</div>;
	// }
	//
	// console.log(user);

	return (
		<>
			{/*<AppHeader username={user.username} page={document.title}/>*/}
			{/*/!*TODO: Should Fetch the Username from The Saved Session or Something*!/*/}
			{/*/!*<section id="Account_Section">*!/*/}
			{/*/!*	<Account />*!/*/}
			{/*/!*</section>*!/*/}

			{/*<AppFooter />*/}
		</>
	)
}
