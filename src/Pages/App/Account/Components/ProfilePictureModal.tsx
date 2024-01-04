import Axios from "axios";
import { useDropzone } from 'react-dropzone';
import { AiOutlineUpload } from 'react-icons/ai';
import {BASE_URL, getAuth} from "@/Helpers/Helpers";
import React from "react";
import {AlertType} from "@/Types/Types";
import Alert from "@UI/Simple/Alert";
import { MKServerAPI } from "@/Services/ServiceAPI";
const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";

export default function ProfilePictureModal(props: ModalProps) {
	const [alertShown, setAlertShown] = React.useState(false)
	const [alertType, setAlertType] = React.useState<AlertType>("info")
	const [alertMessage, setAlertMessage] = React.useState("None")

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/png': ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG'],
		},
		maxFiles: 1,
		maxSize: 5 * 1024 * 1024, // 5MB
		onDrop: (acceptedFiles: any) => {
			const file = acceptedFiles[0] // Only one file allowed
			Axios({
				method: "post",
				url: `${BASE_URL}/app/update-profile-picture`,
				data: {
					profilePicture: file
				},
				headers: {
					'Authorization': `Bearer ${getAuth()}`,
					'Content-Type': `multipart/form-data; boundary=${boundary}`
				},
			}).then((res) => {
				console.log("Response: ", res);
				MKServerAPI.util?.invalidateTags(["User"]) // Invalidate Cache After Update So The New Data Is Fetched
				setAlertType("info")
				setAlertMessage("Profile Picture Updated!")
			}).catch((err) => {
				console.log("Error: ", err);
				setAlertType("error")
				setAlertMessage("Profile Picture Update Failed. !")
			}).finally(() => {
				setAlertShown(true)
				setTimeout(() => {
					setAlertShown(false)
					setTimeout(() => {
						props.setModalState(false)
					}, 500)
				}, 2500)
			})
		}
	});

	return (
		<>
			<div {...getRootProps()} className="border-2 border-blue-600 border-dotted p-2 mx-2 rounded-xl text-black">
				<input {...getInputProps()} />
				<p className="text-sm"><AiOutlineUpload style={{display:"inline"}} size="2em"/> Upload or Drop a File Here...</p>
				<p className="text-sm text-gray-400">[.jpg,.png,.gif]</p>
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
