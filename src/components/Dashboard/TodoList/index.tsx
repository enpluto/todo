import { useAuth } from "../../../contexts/AuthContext";
import {
  deleteCompletedTodos,
  fetchTodos,
} from "../../../reducers/todos/todoActions";

import TodoItem from "./TodoItem";
interface TodoListProp {
  activeTab: string;
}

const TodoList = ({ activeTab }: TodoListProp) => {
  const { state, todos, setTodos } = useAuth();
  const { token } = state;

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const handleDeleteAllDone = async () => {
    if (token) {
      await deleteCompletedTodos(token, todos);
      handleFetchTodos(token);
    }
  };

  const sumUndone = todos.reduce((acc, todo) => {
    return acc + (todo.status === false ? 1 : 0);
  }, 0);

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "待完成") return todo.status === false;
    if (activeTab === "已完成") return todo.status === true;
    return true;
  });

  return (
    <div className="p-4">
      <ul className="flex flex-col gap-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <ol className="flex justify-between py-2">
          <li>{sumUndone} 個待完成項目</li>
          <li
            className="text-darkGray md:pr-8 cursor-pointer"
            onClick={handleDeleteAllDone}
          >
            清除已完成項目
          </li>
        </ol>
      </ul>
    </div>
  );
};

export default TodoList;
