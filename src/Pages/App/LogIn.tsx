import React from "react"

export default function LogIn() {
	return (
	//Chech if a jwt is already stored in the local storage, if not, show the login form
	//If a jwt is already stored, redirect to the dashboard
	//For the login: we will encode the given password and compare it to the one in the database.
	//		values.password = sha256(values.password).toString()

		<div>LogIn</div>
	)
}
