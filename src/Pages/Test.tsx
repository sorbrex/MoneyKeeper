import React from 'react';
import CenteredContainer from "@/Layouts/CenteredContainer";
import ProfilePicture from "@UI/ProfilePicture";
import { AiOutlineLogout } from "react-icons/ai";
import {ErrorMessage, Field} from "formik";
import Title from "@UI/Typography/Title";

export default function Test() {
	const name = "John";
	const surname = "Doe";
	const email = "johndoe@gmail.com";
	const password = "password";

	return (
		<>
			<section id="Account_Page" className="h-screen flex flex-col">

				<CenteredContainer>
					<div className="rounded-2xl mx-auto w-full flex max-w-sm md:max-w-3xl lg:max-w-5xl flex-col md:flex-row" style={{border:'2px solid black'}}>

						{/*Breakpoint Usage => lg:bg-red --> From LG (1024px) and Above set Background Red*/}

						<div id="Account_Sidebar" className="flex flex-col items-center justify-between w-full md:w-1/4 min-h-[300px] md:min-h-[500px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none p-4 bg-pureBlack text-white">

								<ProfilePicture />
								<h1 className="text-2xl">{name} {surname}</h1>

							<div className="flex flex-row items-center justify-center md:justify-start w-full">
								<AiOutlineLogout />

								<h3 className="p-2">Log Out</h3>
							</div>

						</div>




						<div id="Account_Info" className="w-full md:w-3/4 flex flex-col items-center md:items-start justify-start rounded-b-xl md:rounded-r-xl bg-pageGray p-8">

							<Title title="Account Info" underline={false}/>


							<div id="Top_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full md:mt-10 md:mb-4"  style={{border:'2px solid black'}}>
								<input type="text" id="name" placeholder={name} className="bg-softBlack rounded-lg p-2.5 md:min-w-[300px]" disabled />
								<input type="text" id="surname" placeholder={surname} className="bg-softBlack rounded-lg p-2.5 md:min-w-[300px]" disabled />
							</div>


							<div id="Bottom_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
									<input type="email" id="email" placeholder={email} className="bg-softBlack rounded-lg p-2.5 md:min-w-[300px]" disabled />
									<input type="password" id="password" value={password} className="bg-softBlack rounded-lg p-2.5 md:min-w-[300px]" disabled />
							</div>

						</div>

					</div>
				</CenteredContainer>

			</section>
		</>
	);
}
