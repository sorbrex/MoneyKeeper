import axios from "axios"
export const BASE_URL = "http://localhost:8080"

export async function Auth() {
	const savedJwt = sessionStorage.getItem("users-jwt")
	if (savedJwt == null) {
		return false
	} else {
		const res = await axios.get(`${BASE_URL}/user/verifyJwt`)
		if (res.status === 200) {
			return true
		} else {
			return false
		}
	}
}