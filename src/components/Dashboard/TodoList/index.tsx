import { useState } from "react";
import { Todo, useAuth } from "../../../contexts/AuthContext";
import {
  deleteCompletedTodos,
  deleteTodo,
  editTodo,
  fetchTodos,
  toggleTodo,
} from "../../../reducers/todos/todoActions";

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

  const EditTodo = ({ todo }: { todo: Todo }) => {
    const { id, status, content } = todo;
    const [editedTodo, setEditedTodo] = useState(content);
    const [editingId, setEditingId] = useState("");

    const isEditing = editingId === id && status === false;
    const isChanged = editedTodo !== "" && editedTodo !== content;

    const handleEditTodo = async () => {
      if (!token) return;
      if (isChanged) {
        await editTodo(token, id, editedTodo);
        handleFetchTodos(token);
      }
      setEditingId("");
    };

    const handleStartEditing = () => {
      setEditingId(id);
      setEditedTodo(content);
    };

    return isEditing ? (
      <div className="flex justify-between gap-x-3 items-center w-full">
        <input
          type="text"
          value={editedTodo}
          className="border border-darkGray rounded-md p-1 w-full"
          onChange={(e) => setEditedTodo(e.target.value)}
        />
        <span
          className="text-darkGray cursor-pointer whitespace-nowrap"
          onClick={handleEditTodo}
        >
          完成
        </span>
      </div>
    ) : (
      <div className="flex justify-between items-center w-full">
        <span className={status ? "text-darkGray line-through" : ""}>
          {content}
        </span>
        <span
          className={`text-darkGray cursor-pointer whitespace-nowrap ${status ? "hidden" : "block"}`}
          onClick={handleStartEditing}
        >
          編輯
        </span>
      </div>
    );
  };

  const TodoStatus = ({ todo }: { todo: Todo }) => {
    const { status, id } = todo;
    const isCompleted = status === true;

    const handleToggleTodo = async () => {
      if (!token) return;
      await toggleTodo(token, id);
      handleFetchTodos(token);
    };

    return isCompleted ? (
      <img
        src="src/assets/check_yellow.svg"
        alt=""
        onClick={handleToggleTodo}
      />
    ) : (
      <input
        className="w-5 h-5"
        type="checkbox"
        checked={status}
        onChange={handleToggleTodo}
      />
    );
  };

  const TodoItem = ({ todo }: { todo: Todo }) => {
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
