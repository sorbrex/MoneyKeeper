import React from "react"
import Card from "@Assets/Card.png"
import Wave from "@Assets/WaveDark.png"
import { BiArrowBack } from "react-icons/bi"
import ButtonPrimary from "@/UI/Buttons/ButtonPrimary"

export default function HomeSection() {
	return (
		<>
			<div id="Home__Content" className="m-0 p-2 pb-0 pt-24 bg-black sm:flex sm:h-screen ">
				<div id="Hero" className="flex flex-col justify-center items-center w-full h-full text-center sm:w-4/6 sm:m-2 sm:mb-0">
					<div id="Title" className="my-4 text-4xl sm:text-2xl font-bold leading-tight uppercase lg:text-4xl xl:text-5xl">
							No need the
						<h1 className="font-extrabold text-transparent text-5xl sm:text-3xl lg:text-5xl xl:text-6xl bg-clip-text bg-gradient-to-br from-faceBlue to-contrastBlue">wall</h1> 
							to make your
						<h1 className="font-extrabold text-transparent text-5xl sm:text-3xl lg:text-5xl xl:text-6xl bg-clip-text bg-gradient-to-br from-faceBlue to-contrastBlue">street</h1>
					</div>
					<p className="leading-normal text-xl mb-6 sm:text-sm lg:text-xl xl:text-2xl">
						Make better financial decisions based on personalized data.
					</p>
					<ButtonPrimary content="Get Started" icon={<BiArrowBack className='mb-1 ml-1 rotate-135'/>} pageRef={"/signup"} />
				</div>
				<img alt="Credit Card" src={Card} className="mt-10 sm:w-4/5 sm:h-4/5 md:h-auto md:w-auto"/>
			</div>
			<img id="Home_Wawe" src={Wave} />
		</>
	)
}
