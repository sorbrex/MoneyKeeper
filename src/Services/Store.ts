import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {MKServerAPI} from "./ServiceAPI" //Import The Api created with createApi from ServiceAPI.ts (This Contains Our Queries)

export const store = configureStore({
	reducer: {
		[MKServerAPI.reducerPath]: MKServerAPI.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(MKServerAPI.middleware),
})

setupListeners(store.dispatch)