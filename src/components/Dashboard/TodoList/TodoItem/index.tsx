import { Todo, useAuth } from "../../../../contexts/AuthContext";
import { deleteTodo } from "../../../../reducers/todos/todoActions";
import EditTodo from "../EditTodo";
import TodoStatus from "../TodoStatus";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { state, handleFetchTodos } = useAuth();
  const { token } = state;
  const { id } = todo;

  const handleDeleteTodo = async () => {
    if (!token) return;
    await deleteTodo(token, id);
    handleFetchTodos(token);
  };

  return (
    <li className="flex justify-between gap-x-2 border-b md:border-none border-lightGray">
      <div className="flex gap-x-4 items-center w-full pb-4 md:border-b border-lightGray">
        <TodoStatus todo={todo} />
        <EditTodo todo={todo} />
      </div>
      <img
        src="src/assets/close.svg"
        alt=""
        className="pb-4 cursor-pointer"
        onClick={handleDeleteTodo}
      />
    </li>
  );
};

export default TodoItem;
