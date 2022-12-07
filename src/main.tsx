import React from "react"
import ReactDOM from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom"
import "./index.css"
import App from "./App"
import ErrorPage from "@Pages/Base/ErrorPage"
import Login from "@Pages/App/LogIn"
import SignUp from "@Pages/App/SignUp"
import Contact from "@Pages/Base/Contact"
import About from "@/Pages/Base/About"
import Redirect from "@Pages/Base/Redirect"
import Account from "@/Pages/App/Account"
import Dashboard from "@Pages/App/Dashboard"
import History from "@Pages/App/History"

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
		element: <Login />,
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
