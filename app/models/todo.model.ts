import { model, models, Schema } from "mongoose";

export interface ITodo {
  _id?: string
  title: string;
  description: string;
  isCompleted?: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);
