import axios from "axios"
export const BASE_URL = "https://money-keeper-api.onrender.com" //"http://localhost:8080"

export async function Auth() {
	const savedJwt = sessionStorage.getItem("users-jwt")

	if (!savedJwt) {
		return false
	} else {
		console.log("Found:", savedJwt)
		console.log("Asking to Server for auth")
		const res = await axios.get(`${BASE_URL}/user/verifyJwt?token=${savedJwt}`)
		if (res.status === 200) {
			console.log("Server Auth")
			return true
		} else {
			console.log("Server No Auth")
			return false
		}
	}
}