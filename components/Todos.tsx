import { Todo } from "@/api/api.types";
import { map } from "lodash";
import { useCallback } from "react";

const TodoItem = ({ todo, completed, userId }: Todo) => (
  <div
    className={`p-6 rounded-lg shadow-md transition-shadow ${
      completed ? "bg-green-100" : "bg-red-100"
    } hover:shadow-lg`}
  >
    <h2 className="text-lg font-semibold mb-2">{todo}</h2>
    <p
      className={`text-sm font-medium mb-4 ${
        completed ? "text-green-700" : "text-red-700"
      }`}
    >
      {completed ? "Completed" : "Not Completed"}
    </p>
    <div className="text-sm text-gray-600">User ID: {userId}</div>
  </div>
);

export default function Todos({ todos }: { todos: Todo[] }) {
  const renderTodo = useCallback(
    (todo: Todo) => <TodoItem {...todo} key={todo.id} />,
    []
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Todos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {map(todos, renderTodo)}
      </div>
    </div>
  );
}
