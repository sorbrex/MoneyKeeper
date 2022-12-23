import axios from "axios"
const baseUrl = "https://localhost:8080"
export async function Auth() {
	const savedJwt = sessionStorage.getItem("users-jwt")
	if (savedJwt == null) {
		return null
	} else {
		axios.get(`${baseUrl}/`)
		return savedJwt
	}
}