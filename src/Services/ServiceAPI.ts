import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {BASE_URL, getAuth} from "@/Helpers/Helpers"
import {Transaction} from "@/Types/Types"


export const MKServerAPI = createApi({
	reducerPath: "MKServerAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/app/`
	}),
	//Before the endpoints we need the tags. using tag will help us to invalidate cache and refetch data every time we add or delete a new album
	tagTypes: ["Transaction", "User", "Category"],

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

		updateUserPassword: builder.mutation<void, string>({
			query: (password: string) => ({
				url: "changePassword",
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
				body: { newPassword: password },
			}),
			invalidatesTags: ["User"],
		}),

		updateUserProfilePic: builder.mutation<void, Buffer>({ //Fix URL
			query: (profilePic: Buffer) => ({
				url: "updateProfilePicture",
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
				body: { profilePicture: profilePic },
			}),
			invalidatesTags: ["User"],
		}),

		deleteUser: builder.mutation<void, void>({
			query: () => ({
				url: "deleteUser",
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
			}),
			invalidatesTags: ["User"],
		}),

		//Data Endpoint
		getTransactions: builder.query({
			query: (args:{token:string, limit?:number}) => (
				{
					url: `getTransactions${args.limit ? ("?limit=" + args.limit):""}`,
					method: "GET",
					headers: {
						Authorization: `Bearer ${args.token}`
					}
				}
			),
			providesTags: ["Transaction"],
		}),

		createTransaction: builder.mutation({
			query: (transaction: Transaction) => ({
				url: "createTransaction",
				method: "POST",
				body: { ...transaction },
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
			}),
			invalidatesTags: ["Transaction"], //Here we invalidate the tag, so we will call all the fetching endpoints with this tag as dependencies
		}),

		deleteTransaction: builder.mutation<void, string>({
			query: (transactionId: string) => ({
				url: "deleteTransaction",
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
				body: { transactionId },
			}),
			invalidatesTags: ["Transaction"],
		}),

		updateTransaction: builder.mutation<void, Transaction>({
			query: (transaction: Transaction) => ({
				url: "updateTransaction",
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${getAuth()}`
				},
				body: { ...transaction },
			}),
			invalidatesTags: ["Transaction"],
		}),

		//Category Endpoint
		getCategory: builder.query({
			query: (token: string) => (
				{
					url: "getCategories",
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			),
			providesTags: ["Category"],
		}),

	}),
})

export const {
	useGetUserQuery,
	useUpdateUserPasswordMutation,
	useUpdateUserProfilePicMutation,
	useGetTransactionsQuery,
	useCreateTransactionMutation,
	useDeleteTransactionMutation,
	useUpdateTransactionMutation,
	useGetCategoryQuery,
} = MKServerAPI // Export hooks for usage in functional components