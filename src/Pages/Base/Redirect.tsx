import React from "react"
import CenteredContainer from "@/Layouts/CenteredContainer"

export default function Redirect() {
	return (
		<CenteredContainer>
			<div id="Frame" className="bg-pageGray w-full h-full">
				<h3 className="text-2xl font-bold">Thank you for joining the money Keeper family!
We have sent you a confirmation email. Check your mailbox and once your email is confirmed you can start using our service.
Sometimes the confirmation email may arrive in your junk/spam folder, check there too if you can&apos;t find it in your main mailbox</h3>
			</div>
		</CenteredContainer>
	)
}
