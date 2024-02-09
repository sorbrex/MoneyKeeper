import React, {useState} from "react"
import { AiOutlineEdit } from "react-icons/ai"
import ReactModal from "react-modal"
import UpdatePasswordModalForm from "@Pages/App/Account/Components/UpdatePasswordModalForm"


export default function AccountPasswordLabel (props:AccountPasswordLabelProps) {

	const [modalIsOpen, setModalIsOpen] = useState(false)


	return (
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="Upload Account Password"
				shouldCloseOnEsc={true}
				style={{content:{display: "flex", justifyContent: "center", alignItems: "center", height: "75%", width: "85%", margin: "auto"}}}
				appElement={document.getElementById("root") as HTMLElement}
			>
				<UpdatePasswordModalForm setModalState={ setModalIsOpen } originalPassword={props.originalPassword}/>
			</ReactModal>

			<div className="relative flex flex-row justify-between text-white">
				<input type="password" value="placeholder" className="
					bg-softBlack rounded-lg p-2.5 m-2.5 md:m-5
					min-w-[300px] md:min-w-[200px] lg:min-w-[300px]"
				disabled />
				<AiOutlineEdit className="absolute right-7 md:right-8 top-5 md:top-7 text-2xl" onClick={()=>{ setModalIsOpen(true) }} />
			</div>
		</>
	)
}

type AccountPasswordLabelProps = {
	originalPassword: string
}