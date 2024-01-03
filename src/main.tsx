import React from "react"
import ReactDOM from "react-dom/client"
import {
	createHashRouter,
	RouterProvider
} from "react-router-dom"
import {Provider} from "react-redux";
import "./index.css"
import App from "./App"
import ErrorPage from "@Pages/Base/ErrorPage"
import Login from "@Pages/App/Login/LogIn"
import Recovery from "@Pages/App/Recovery/Recovey"
import SignUp from "@Pages/App/Signup/SignUp"
import Contact from "@Pages/Base/Contacts/Contact"
import About from "@Pages/Base/About/About"
import Account from "@Pages/App/Account/Account"
import Dashboard from "@Pages/App/Dashboard/Dashboard"
import Movements from "@Pages/App/Movements/Movements"
import Test from "@Pages/Test";
import {store} from "@/Services/Store";

const router = createHashRouter([
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
		path: "/recovery",
		element: <Recovery />,
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
		element: <Movements />,
		errorElement: <ErrorPage />
	},
	{
		path: "/test",
		element: <Test />,
		errorElement: <ErrorPage />
	}
])


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
