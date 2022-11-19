import React from "react"
import ReactDOM from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom"
import "./index.css"
import App from "./App"
import ErrorPage from "@Pages/ErrorPage"
import LoginPage from "@Pages/LogIn"
import SignUp from "@Pages/SignUp"
import Contact from "@Pages/Contact"
import About from "@Pages/AboutUs"
import Redirect from "@Pages/Redirect"
import Account from "@Pages/Account"
import Dashboard from "@Pages/Dashboard"
import History from "@Pages/History"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />
	},
	{
		path: "/signup",
		element: <SignUp />,
		errorElement: <ErrorPage />
	},
	{
		path: "/login",
		element: <LoginPage />,
		errorElement: <ErrorPage />
	},
	{
		path: "/about",
		element: <About />,
		errorElement: <ErrorPage />
	},
	{
		path: "/contact",
		element: <Contact />,
		errorElement: <ErrorPage />
	},
	{
		path: "/redirect",
		element: <Redirect />,
		errorElement: <ErrorPage />
	},
	{
		path: "/account",
		element: <Account />,
		errorElement: <ErrorPage />
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		errorElement: <ErrorPage />
	},
	{
		path: "/history",
		element: <History />,
		errorElement: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
