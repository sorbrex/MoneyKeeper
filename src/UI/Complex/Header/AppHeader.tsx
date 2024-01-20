import React, {useState} from "react"
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import Logo from "@Assets/Logo_Black.png"
import ButtonLink from "@UI/Simple/Buttons/ButtonLink"
import ContainerLeft from "@/Layouts/ContainerLeft"

export default function AppHeader(props: {page: string, username: string}) {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<header className="w-full">
			<nav id="NavBar" className="fixed z-10 top-0 flex items-center justify-between w-full p-4 select-none bg-white text-black">
				<div id="Brand" className="text-2xl flex items-center justify-center">
					<img src={Logo} alt='Logo' className="h-9 w-9 m-2"/>
					Money Keeper
				</div>


				{/*
					============================================
					= Standard Mobile Status, Full Hidden Menu =
					============================================
				*/}

				<div id="Mobile Menu" className="block sm:hidden">
					<div className="py-2 px-4 m-1 flex items-start cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <AiOutlineClose size="2em"/> : <AiOutlineMenu size="2em"/>}</div>
				</div>

				<div className={`absolute right-0 top-20 bg-white min-w-[200px] min-h-[200px] flex flex-col justify-between sm:hidden ${menuOpen ? "visible" : "hidden"}`}>
					<ContainerLeft>
						<ButtonLink content='Dashboard' pageRef="/dashboard" underline={props.page === "Dashboard"}/>
						<ButtonLink content='Transaction' pageRef="/transaction" underline={props.page === "Transaction"}/>
					</ContainerLeft>
					<ContainerLeft>
						<ButtonLink content={props.username} pageRef="/account" icon={<AiOutlineUser size="2em"/>} iconFirst={true} underline={props.page === "Account"}/>
					</ContainerLeft>
				</div>

				{/*
					=========================================
					= Standard Desktop Status, Full Visible =
					=========================================
				*/}
				<div id="UserInteraction" className="w-full hidden pt-6 sm:flex sm:items-center sm:w-auto sm:pt-0">
					<ButtonLink content='Dashboard' pageRef="/dashboard" underline={props.page === "Dashboard"}/>
					<ButtonLink content='Transaction' pageRef="/transaction" underline={props.page === "Transaction"}/>
				</div>

				<div id="Account" className="w-full hidden pt-6 sm:flex sm:items-center sm:w-auto sm:pt-0">
					<ButtonLink content={props.username} pageRef="/account" icon={<AiOutlineUser size="2em" className="ml-2"/>} underline={props.page === "Account"}/>
				</div>
			</nav>
		</header>
	)
}