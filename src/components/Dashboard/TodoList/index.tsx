import { Todo, useAuth } from "../../../contexts/AuthContext";
import { deleteCompletedTodos } from "../../../reducers/todos/todoActions";
import TodoItem from "./TodoItem";

const TodoList = ({ activeTab }: { activeTab: string }) => {
  const { state, todos, handleFetchTodos } = useAuth();
  const { token } = state;

  const handleDeleteAllCompleted = async () => {
    if (!token) return;
    await deleteCompletedTodos(token, todos);
    handleFetchTodos(token);
  };

  const filterTodosByTab = (todos: Todo[], activeTab: string): Todo[] => {
    switch (activeTab) {
      case "待完成":
        return todos.filter((todo) => !todo.status);
      case "已完成":
        return todos.filter((todo) => todo.status);
      default:
        return todos;
    }
  };
  const filteredTodos = filterTodosByTab(todos, activeTab);

  const countRemainingTodos = (todos: Todo[]): number => {
    return todos.filter((todo) => !todo.status).length;
  };
  const remainingTodos = countRemainingTodos(todos);

  return (
    <div className="p-4">
      <ul className="flex flex-col gap-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <ol className="flex justify-between py-2">
          <li>{remainingTodos} 個待完成項目</li>
          <li
            className="text-darkGray md:pr-8 cursor-pointer"
            onClick={handleDeleteAllCompleted}
          >
            清除已完成項目
          </li>
        </ol>
      </ul>
    </div>
  );
};

export default TodoList;
