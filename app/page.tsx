"use client";
import { FormEvent, useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
} from "./provider/redux/query/TodoApi";
import { ImSpinner9 } from "react-icons/im";
import Loading from "./components/shared/Loading";
import { ITodo } from "./models/todo.model";
import Swal from "sweetalert2";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: todos, isError, isLoading, refetch } = useGetAllTodosQuery("");
  const [addTodo, addTodoResponse] = useAddTodoMutation();
  const [deleteTodo, deleteTodoResponse] = useDeleteTodoMutation();

  if (isLoading) return <Loading />;

  // handle form submit
  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = form?.taskName?.value;
    const description = form?.description?.value;
    const payload: ITodo = { title, description };
    setIsProcessing(true);
    try {
      const { data, error } = await addTodo(payload);
      if (data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Todo Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  //handle delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const { data, error } = await deleteTodo(id);
      if (data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Todo Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-10 w-[50%] mx-auto flex flex-col gap-8">
      <div className="w-full">
        <h1 className="font-bold text-lg text-blue-500">Add a Todo</h1>
        <form
          onSubmit={handleAddTodo}
          className="w-full mx-auto rounded pt-6 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taskName"
            >
              Task Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="flex justify-center items-center bg-blue-500 text-center w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              type="submit"
            >
              {!isProcessing ? (
                "Create Todo"
              ) : (
                <ImSpinner9 className="animate-spin" size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
      {isError && (
        <h2 className="text-rose-500 font-bold text-lg">
          Error while retrieving todos
        </h2>
      )}
      {!isLoading && !isError && (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Todos</h2>
          {todos?.data?.length === 0 ? (
            <p className="text-gray-500">No todos yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {todos?.data?.map((todo: ITodo, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {todo.title}
                  </h3>
                  <p className="text-gray-700">{todo.description}</p>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="py-2 px-3 rounded bg-blue-500 text-white mt-5"
                  >
                    Delete Todo
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
