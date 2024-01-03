import React from 'react';
import CenteredContainer from "@/Layouts/CenteredContainer";
import ProfilePicture from "@Pages/App/Account/Components/ProfilePicture";
import { AiOutlineLogout } from "react-icons/ai";
import Title from "@UI/Simple/Typography/Title";
import AccountInfoLabel from "@Pages/App/Account/Components/AccountInfoLabel";
import {useGetUserQuery} from "@/Services/ServiceAPI";
import {getAuth} from "@/Helpers/Helpers";
import {User} from "@/Types/Types";

export default function Test() {

	const {
		data: accountInfo = {} as User,
		isLoading,
		isFetching,
		isError,
		error,
	} = useGetUserQuery(getAuth());

	if (isLoading || isFetching) {
		return <div>Loading...</div>;
	}

	if (isError) {
		console.log({ error });
		return <div>{JSON.stringify(error)}</div>;
	}

	return (
		<>
			<section id="Account_Page" className="h-screen flex flex-col">

				<CenteredContainer>
					<div className="rounded-2xl mx-auto w-full flex max-w-sm md:max-w-3xl lg:max-w-5xl flex-col md:flex-row shadow-lg">

						{/*Breakpoint Usage => lg:bg-red --> From LG (1024px) and Above set Background Red*/}

						<div id="Account_Sidebar" className="p-4 bg-pureBlack text-white flex flex-col items-center justify-between w-full md:w-1/4 min-h-[300px] md:min-h-[500px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none">

							<div>
								<ProfilePicture source={accountInfo.remoteImageUrl} />
								<h1 className="text-2xl">{accountInfo.name} {accountInfo.surname}</h1>
							</div>

							<div className="flex flex-row items-center justify-center md:justify-start w-full">
								<AiOutlineLogout />

								<h3 className="p-2">Log Out</h3>
							</div>

						</div>

						<div id="Account_Info" className="w-full md:w-3/4 flex flex-col items-center md:items-start justify-start rounded-b-xl md:rounded-r-xl bg-pageGray p-8">

							<Title title="Account Info"/>

							<div id="Top_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
								<AccountInfoLabel content={accountInfo.name} type="text"/>
								<AccountInfoLabel content={accountInfo.surname} type="text"/>
							</div>

							<div id="Bottom_Row_Info" className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
								<AccountInfoLabel content={accountInfo.email} type="email"/>
								<AccountInfoLabel content={"placeholder"} type="password"/>
							</div>

						</div>

					</div>
				</CenteredContainer>

			</section>
		</>
	);
}
