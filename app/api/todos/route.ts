import { connectDB } from "@/app/config/connectDB";
import { Todo } from "@/app/models/todo.model";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (request: Request, response: Response) => {
  const todos = await Todo.find();
  return NextResponse.json({
    success: true,
    message: "Todos Retrieved Successfully",
    data: todos,
  });
};
export const POST = async (request: Request, response: Response) => {
  const task = await request.json();
  try {
    const result = await Todo.create(task);
    if (result) {
      return NextResponse.json({
        success: true,
        message: "Todo Added Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
