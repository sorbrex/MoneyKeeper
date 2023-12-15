import axios from "axios"
export const BASE_URL = "https://money-keeper-api.onrender.com" //"http://localhost:8080"

export async function Auth() {
	console.log('Checking For Saved JWT in Session')
	const savedJwt = sessionStorage.getItem("users-jwt")
	console.log(sessionStorage.getItem("users-jwt"))
	if (savedJwt == null) {
		console.log('Didnt Find JWT Token')
		return false
	} else {
		console.log('Found:', savedJwt)
		console.log('Asking to Server for auth')
		const res = await axios.get(`${BASE_URL}/user/verifyJwt`)
		if (res.status === 200) {
			console.log("Server Auth")
			return true
		} else {
			console.log("Server No Auth")
			return false
		}
	}
}