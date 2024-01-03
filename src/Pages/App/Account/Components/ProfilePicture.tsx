import React from 'react';
import Default_Propic from "@Assets/Default_Propic.png";
import { AiOutlineEdit } from "react-icons/ai";

export default function ProfilePicture(props:{source?: string}) {
	return(
		<>
			<div className="relative">
			<AiOutlineEdit className="absolute right-2 top-2 text-3xl" />

			<img src={props.source || Default_Propic} className="w-40 h-40 rounded-full" alt="Profile"/>
			</div>
		</>
	)
}