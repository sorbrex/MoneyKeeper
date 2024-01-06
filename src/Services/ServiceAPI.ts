import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {BASE_URL, getAuth} from "@/Helpers/Helpers"
import {Transaction} from "@/Types/Types"


export const MKServerAPI = createApi({
	reducerPath: "MKServerAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/app/`
	}),
	//Before the endpoints we need the tags. using tag will help us to invalidate cache and refetch data every time we add or delete a new album
	tagTypes: ["Transaction", "User"],

	endpoints: (builder) => ({
		//User Endpoint
		getUser: builder.query({
			query: (token: string) => (
				{
					url: "getAccountInfo",
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			),
			providesTags: ["User"],
		}),

		updateUser: builder.mutation({
			query: (password: string) => ({
				url: "updateUser",
				method: "PUT",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
				body: { password },
			}),
			invalidatesTags: ["User"],
		}),

		//Data Endpoint
		getTransactions: builder.query({
			query: (token:string) => (
				{
					url: "transactions",
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			),
			providesTags: ["Transaction"],
		}),

		createTransaction: builder.mutation({
			query: (transaction: Transaction) => ({
				url: "newTransaction",
				method: "POST",
				body: { ...transaction },
			}),
			invalidatesTags: ["Transaction"], //Here we invalidate the tag, so we will call all the fetching endpoints with this tag as dependencies
		}),

		deleteTransaction: builder.mutation({
			query: (transactionId) => ({
				url: `deleteTransaction/${transactionId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Transaction"],
		}),
	}),
})

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useGetTransactionsQuery,
	useCreateTransactionMutation,
	useDeleteTransactionMutation
} = MKServerAPI // Export hooks for usage in functional components