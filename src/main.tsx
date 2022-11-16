import React from "react"
import ReactDOM from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider,
	Route,
} from "react-router-dom"
import "./index.css"
import App from "./App"
import ErrorPage from "./Pages/ErrorPage"
import LoginPage from "./Pages/LogIn"
import RegisterPage from "./Pages/SignUp"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />
	},
	{
		path: "/register",
		element: <RegisterPage />,
		errorElement: <ErrorPage />
	},
	{
		path: "/login",
		element: <LoginPage />,
		errorElement: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
