import React from "react"
import ReactDOM from "react-dom/client"
import {
	createHashRouter,
	RouterProvider
} from "react-router-dom"
import {Provider} from "react-redux"
import "./index.css"
import "react-day-picker/dist/style.css"
import App from "./App"
import ErrorRoutePage from "@Pages/Base/ErrorRoutePage"
import Login from "@Pages/App/Login/LogIn"
import Recovery from "@Pages/App/Recovery/Recovey"
import SignUp from "@Pages/App/Signup/SignUp"
import Contact from "@Pages/Base/Contacts/Contact"
import About from "@Pages/Base/About/About"
import Account from "@Pages/App/Account/Account"
import Dashboard from "@Pages/App/Dashboard/Dashboard"
import Transaction from "@Pages/App/Transaction/Transactions"
import Test from "@Pages/Test"
import {store} from "@/Services/Store"

const router = createHashRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/signup",
		element: <SignUp />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/recovery",
		element: <Recovery />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/about",
		element: <About />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/contact",
		element: <Contact />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/account",
		element: <Account />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/transaction",
		element: <Transaction />,
		errorElement: <ErrorRoutePage />
	},
	{
		path: "/test",
		element: <Test />,
		errorElement: <ErrorRoutePage />
	}
])


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
