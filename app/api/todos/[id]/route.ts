import { connectDB } from "@/app/config/connectDB";
import { Todo } from "@/app/models/todo.model";
import { NextResponse } from "next/server";

connectDB();
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    console.log("Deleting Todo with ID:", id);
    const deletedTodo = await Todo.findByIdAndDelete(id);
    console.log(deletedTodo);
    if (!deletedTodo) {
      return NextResponse.json({
        success: false,
        message: "Todo not found or already deleted",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Todo deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
