import { Todo, useAuth } from "../../../../contexts/AuthContext";
import { toggleTodo } from "../../../../reducers/todos/todoActions";

const TodoStatus = ({ todo }: { todo: Todo }) => {
  const { state, handleFetchTodos } = useAuth();
  const { token } = state;
  const { status, id } = todo;
  const isCompleted = status === true;

  const handleToggleTodo = async () => {
    if (!token) return;
    await toggleTodo(token, id);
    handleFetchTodos(token);
  };

  return isCompleted ? (
    <img src="src/assets/check_yellow.svg" alt="" onClick={handleToggleTodo} />
  ) : (
    <input
      className="w-5 h-5"
      type="checkbox"
      checked={status}
      onChange={handleToggleTodo}
    />
  );
};

export default TodoStatus;
