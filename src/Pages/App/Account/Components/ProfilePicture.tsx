import React, {useState} from "react"
import ReactModal from "react-modal"
import Default_Profile_Picture from "@Assets/Default_Propic.png"
import { AiOutlineEdit } from "react-icons/ai"
import ProfilePictureModal from "@Pages/App/Account/Components/ProfilePictureModal"
export default function ProfilePicture(props: ProfilePictureProps) {
	const [modalIsOpen, setModalIsOpen] = useState(false)


	return(
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				onAfterClose={() => props.updatePic()}
				contentLabel="Upload Profile Picture"
				shouldCloseOnEsc={true}
				style={{content:{display: "flex", justifyContent: "center", alignItems: "center", height: "25%", width: "25%", margin: "auto"}}}
				appElement={document.getElementById("root") as HTMLElement}
			>
				<ProfilePictureModal setModalState={ setModalIsOpen }/>
			</ReactModal>


			<div className="relative">
				<AiOutlineEdit className="absolute right-2 top-2 text-3xl" onClick={()=>{ setModalIsOpen(true) }} />

				<img src={props.source || Default_Profile_Picture} className="w-40 h-40 rounded-full" alt="Profile"/>
			</div>
		</>
	)
}

type ProfilePictureProps = {
	source?: string,
	updatePic: () => void
}