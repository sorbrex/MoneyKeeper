import React from "react"
import { Link } from "react-router-dom"
import { AiOutlineArrowUp, AiOutlineLogin } from "react-icons/ai"
import Logo from "@Assets/Logo_White.png"
import ButtonPrimary from "@UI/Simple/Buttons/ButtonPrimary"
import ButtonLink from "@UI/Simple/Buttons/ButtonLink"

export default function Header() {
	return (
		<header className="w-full">
			<nav id="NavBar" className="fixed z-10 top-0 flex items-center justify-between w-full p-4 select-none bg-black text-white">
				<div id="Brand" className="text-2xl flex items-center justify-center">
					<img src={Logo} alt='Logo' className="h-9 w-9 m-2"/>
						Money Keeper
				</div>

				<div id="MobileLogin" className="block sm:hidden">
					<Link className="py-2 px-4 m-1 flex items-start" to={"/login"}><AiOutlineLogin size="2em"/></Link>
				</div>
			
				<div id="UserInteraction" className="w-full hidden pt-6 sm:flex sm:items-center sm:w-auto sm:pt-0">
					<ButtonLink content="Log In" pageRef="/login" icon={<AiOutlineArrowUp className='mb-1 ml-1 rotate-45'/>} />
					<ButtonPrimary content="Get Started" pageRef="/signup" icon={<AiOutlineArrowUp className='mb-1 ml-1 rotate-45'/>} />
				</div>
			</nav>
		</header>
	)
}