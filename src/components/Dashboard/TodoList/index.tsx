import Swal from "sweetalert2";
import { Todo, useAppContext } from "../../../contexts/AppContext";
import { deleteCompletedTodos } from "../../../reducers/todos/todoActions";
import TodoItem from "./TodoItem";

const TodoList = ({ activeTab }: { activeTab: string }) => {
  const { state, todos, handleFetchTodos } = useAppContext();
  const { token } = state;
  const hasCompletedTodos = todos.some((todo) => todo.status);

  const handleDeleteAllCompleted = async () => {
    if (!token) return;

    if (hasCompletedTodos) {
      Swal.fire({
        title: "確認清除所有已完成項目？",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確認刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCompletedTodos(token, todos);
          handleFetchTodos(token);
        }
      });
    }
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
