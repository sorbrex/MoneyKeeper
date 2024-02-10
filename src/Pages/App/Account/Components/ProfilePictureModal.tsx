import { useDropzone } from "react-dropzone"
import { AiOutlineUpload } from "react-icons/ai"
import React from "react"
import {AlertType} from "@/Types/Types"
import Alert from "@UI/Simple/Alert"
import {useUpdateUserProfilePicMutation} from "@/Services/ServiceAPI"

export default function ProfilePictureModal(props: ModalProps) {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")

	const [updateProfilePicture] = useUpdateUserProfilePicMutation()

	const closeModal = () => {
		setTimeout(() => {
			setAlertShown(false)
			setTimeout(() => {
				props.setModalState(false)
			}, 300)
		}, 2500)
	}

	const onDrop = (acceptedFiles: Array<any>, rejectedFiles: Array<any>) => {
		if (rejectedFiles.length > 0) {
			setAlertType("error")
			setAlertMessage("Only one file allowed!")
			setAlertShown(true)
			return closeModal()
		}

		const acceptedImage = acceptedFiles[0]
		const formData = new FormData()
		formData.append("file", acceptedImage)
		
		setAlertType("info")
		setAlertMessage("Uploading...")
		setAlertShown(true)
		
		updateProfilePicture(formData)
			.unwrap()
			.then(() => {
				setAlertType("success")
				setAlertMessage("Profile Picture Updated!")
			})
			.catch((err) => {
				console.error("Error: ", err)
				setAlertType("error")
				setAlertMessage("Profile Picture Update Failed!")
			})
			.finally(() => {
				closeModal()
			})
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"image/*": [".png", ".PNG", ".jpg", ".JPG", ".jpeg", ".JPEG"],
		},
		maxFiles: 1,
		maxSize: 5 * 1024 * 1024, // 5MB
		onDrop
	})

	return (
		<>
			<div {...getRootProps()} className="border-2 border-blue-600 border-dotted p-2 mx-2 rounded-xl text-black">
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className="text-sm"><AiOutlineUpload style={{display: "inline"}} size="2em"/> Drop it Here...</p>
				) : (
					<>
						<p className="text-sm"><AiOutlineUpload style={{display: "inline"}} size="2em"/> Upload or Drop a File Here...</p>
						<p className="text-sm text-gray-400">[.jpg,.png,.gif]</p>
					</>
				)}
			</div>
			<div className="fixed bottom-32">
				<Alert visible={alertShown} type={alertType} message={alertMessage}/>
			</div>
		</>
	)
}

interface ModalProps {
	setModalState: (state: boolean) => void;
}
