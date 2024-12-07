import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
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
  const [editedTodo, setEditedTodo] = useState("");
  const [editMode, setEditMode] = useState("");
  const { state, todos, setTodos } = useAuth();
  const { token } = state;

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const handleEditTodo = async (id: string, content: string) => {
    if (token) {
      await editTodo(token, id, content);
      handleFetchTodos(token);
    }
  };

  const handleDeleteAllDone = async () => {
    if (token) {
      await deleteCompletedTodos(token, todos);
      handleFetchTodos(token);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (token) {
      await deleteTodo(token, id);
      handleFetchTodos(token);
    }
  };

  const handleToggleTodo = async (id: string) => {
    if (token) {
      await toggleTodo(token, id);
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
        {filteredTodos.map((todo) => {
          return (
            <li
              className="flex justify-between gap-x-2 border-b md:border-none border-lightGray"
              key={todo.id}
            >
              <div className="flex gap-x-4 items-center w-full pb-4 md:border-b border-lightGray">
                {todo.status ? (
                  <img
                    src="src/assets/check_yellow.svg"
                    alt=""
                    onClick={() => handleToggleTodo(todo.id)}
                  />
                ) : (
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                )}
                {editMode === todo.id && todo.status === false ? (
                  <div className="flex justify-between gap-x-3 items-center w-full">
                    <input
                      type="text"
                      defaultValue={todo.content}
                      className="border border-darkGray rounded-md p-1 w-full"
                      onChange={(e) => setEditedTodo(e.target.value)}
                    />
                    <span
                      className="text-darkGray cursor-pointer whitespace-nowrap"
                      onClick={() => {
                        if (editedTodo !== "" && editedTodo !== todo.content) {
                          handleEditTodo(todo.id, editedTodo);
                        }
                        setEditMode("");
                      }}
                    >
                      完成
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <span
                      className={
                        todo.status ? "text-darkGray line-through" : ""
                      }
                    >
                      {todo.content}
                    </span>
                    <span
                      className={`text-darkGray cursor-pointer whitespace-nowrap ${todo.status ? "hidden" : "block"}`}
                      onClick={() => {
                        setEditMode(todo.id);
                        setEditedTodo(todo.content);
                      }}
                    >
                      編輯
                    </span>
                  </div>
                )}
              </div>
              <img
                src="src/assets/close.svg"
                alt=""
                className="pb-4 cursor-pointer"
                onClick={() => handleDeleteTodo(todo.id)}
              />
            </li>
          );
        })}
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
