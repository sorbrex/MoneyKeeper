import {Category, Transaction} from "@/Types/Types"
import dayjs from "dayjs"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import React from "react"
import {parseCategoryIcon} from "@UI/Simple/CategoryIcon"

export default function TransactionList(props:TransactionListProps) {
	return (
		<div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
			{props.transaction.length === 0 && <h1 className="text-center text-gray-500 mt-16">No Transactions Found</h1>}
			{props.transaction.map((transaction: Transaction) => {
				return (
					<div key={transaction.id} className="flex flex-row justify-between items-center m-2">
						<div className="flex flex-col items-start justify-center min-w-[150px] text-left w-[100px] md:w-[300px]">
							<h1 className="text-xl font-bold">{transaction.name}</h1>
							<p className="text-gray-500">{transaction.description}</p>
						</div>
						<div className="flex flex-col m-2">
							{parseCategoryIcon(props.categoryList,transaction.categoryId)}
						</div>
						<div className="flex flex-col md:flex-row md:justify-between md:min-w-[300px]">
							<p className={`text-xl font-bold ${transaction.type === "expense" ? "text-contrastRed" : "text-contrastGreen"}`}>{transaction.type === "expense" ? "-" : "+"}{transaction.amount}&euro;</p>
							<p className="text-gray-500">{dayjs(transaction.createdAt).format("DD/MM/YYYY")}</p>
						</div>
						{
							(props.editable) &&
								<div className="flex flex-col md:flex-row items-end md:items-center md:justify-around w-[100px]">
									<AiOutlineEdit className="text-2xl cursor-pointer" onClick={() => props.onEdit && props.onEdit(transaction.id)} />
									<AiOutlineDelete className="text-2xl text-contrastRed cursor-pointer" onClick={() => props.onDelete && props.onDelete(transaction.id)} />
								</div>
						}
					</div>
				)
			})}
		</div>
	)
}

type TransactionListProps = {
	transaction: Transaction[]
	categoryList: Category[]
	editable?: boolean
	onEdit?: (transactionId: string) => void
	onDelete?: (transactionId: string) => void
}