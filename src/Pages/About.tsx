import React from "react"
import {AiOutlineGithub, AiOutlineLinkedin, AiOutlineGitlab, AiOutlineGlobal,AiOutlineInstagram} from "react-icons/ai"
import Footer from "@/UI/Footer"
import Propic from "@Assets/Propic.jpg"
import PersonalSkill from "@Assets/PersonalSkill.png"
import Container from "@/Layouts/Container"


export default function About() {
	return (
		<>
			<section id="About_Page"  className="h-screen">
				
				<Container>
					<div id="Profile" className="m-6">
						<div className="w-full flex justify-center items-center">
							<img src={Propic} className="p-1 h-36 rounded-full ring-2 ring-pureblack" alt="My Face" />
						</div>

						<div id="Name" className="text-gray-800 p-6">
							<h1 className="text-3xl font-medium">Nando Sorbello</h1>
							<p className="mt-3 text-4xl">Full Stack Developer</p>
						</div>

					</div>

					<div id="CustomResponsiveLine" className={"flex flex-wrap justify-around flex-row-reverse mx-4 md:flex-row"}>

						<div id="Line_Image" className="w-full md:w-1/2 ">
							<img src={PersonalSkill} alt={"My Skill"} />
						</div>

						<div id="Line_Paragraph" className="w-full text-center px-8 my-4 md:w-1/2 md:text-left">
							<h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">About Me</h3>
							<p className="text-gray-600 mb-8 max-w-lg">
								Hello There! I am Nando, a Full Stack Developer in Catania.<br/><br/>
								I started studying Programming in High School, studying various languages such as Java, Android, HTML, JavaScript and PHP.
								Later I started using more modern languages like TypeScript, Node and Swift, which I now use on a daily basis.<br/><br/>
								At the moment I&apos;m studying to get the Full Stack Developer Certification and at the same time I&apos;m working as a Back-End & iOS Developer at a Company in Catania.<br/><br/>
								My goal is to keep up to date with new technologies, for this reason this Web App was developed with the most common Frameworks nowadays.
								The Back-End was developed with Fastify, MongoDB and Prisma, while the Front-End uses React and Tailwind.
							</p>
						</div>

					</div>

					<div id="Social" className={"flex flex-wrap justify-around mx-4 my-6 flex-col"}>
						<h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">More</h3>
						<div className="flex flex-wrap justify-around flex-row mx-4 md:flex-row">
							<a href="https://github.com/sorbrex" className="text-4xl text-gray-800 font-bold leading-none mb-3 mx-4"><AiOutlineGithub/></a>
							<a href="https://www.linkedin.com/in/sorbellonando/" className="text-4xl text-gray-800 font-bold leading-none mb-3 mx-4"><AiOutlineLinkedin/></a>
							{/* <a href="" className="text-4xl text-gray-800 font-bold leading-none mb-3 mx-4"><AiOutlineGitlab/></a> */}
							<a href="https://nandosorbello.altervista.org/" className="text-4xl text-gray-800 font-bold leading-none mb-3 mx-4"><AiOutlineGlobal/></a>
							<a href="https://www.instagram.com/sorbrex.ns/" className="text-4xl text-gray-800 font-bold leading-none mb-3 mx-4"><AiOutlineInstagram/></a>
						</div>
					</div>
				</Container>
					

				<Footer />
			</section>
		</>
	)
}
