import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            query: (arg) => ({
                url: `/todos?searchTerm=${arg}`,
                method: "GET"
            })
        }),
        addTodo: builder.mutation({
            query: (payload) => ({
                url: "/todos",
                method: "POST",
                body: payload,
            })
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useGetAllTodosQuery, useAddTodoMutation, useDeleteTodoMutation} = TodoApi;