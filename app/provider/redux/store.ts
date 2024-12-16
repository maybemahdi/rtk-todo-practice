import { configureStore } from "@reduxjs/toolkit";
import { TodoApi } from "./query/TodoApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [TodoApi.reducerPath]: TodoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(TodoApi.middleware),
})

setupListeners(store.dispatch);