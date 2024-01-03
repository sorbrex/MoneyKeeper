import axios from "axios"
export const BASE_URL = "http://localhost:8080" //"https://money-keeper-api.onrender.com" //

export async function Auth() {
	const savedJwt = sessionStorage.getItem("users-jwt")

	if (!savedJwt) {
		return false
	} else {
		const res = await axios.get(`${BASE_URL}/app/verifyJwt`, {
			headers: {
				"Authorization": `Bearer ${savedJwt}`
			}
		})
		if (res.status === 200) {
			console.log("Server Auth")
			return true
		} else {
			console.log("Server No Auth")
			return false
		}
	}
}

export function getAuth() {
	const savedJwt = sessionStorage.getItem("users-jwt")
	return savedJwt ? savedJwt : ""
}