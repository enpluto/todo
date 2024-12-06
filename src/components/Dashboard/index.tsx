import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  editTodo,
  fetchTodos,
  toggleTodo,
} from "../../reducers/todos/todoActions";
import EmptyList from "./EmptyList";
import NavBar from "./NavBar";
import TodoFilter from "./TodoFilter";
import TodoInput from "./TodoInput";

const Dashboard = () => {
  const baseUrl = "https://todolist-api.hexschool.io";
  const navigate = useNavigate();
  const { state, todos, setTodos } = useAuth();
  const { token } = state;
  const [editMode, setEditMode] = useState("");

  useEffect(() => {
    if (state.token) {
      handleFetchTodos(state.token);
    } else {
      navigate("/");
    }
  }, [state.token]);

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const TodoList = () => {
    const [activeTab, setActiveTab] = useState("全部");

    const Content = () => {
      const [editedTodo, setEditedTodo] = useState("");

      const handleEditTodo = async (id: string, content: string) => {
        if (token) {
          await editTodo(token, id, content);
          handleFetchTodos(token);
        }
      };

      const handleDeleteAllDone = async () => {
        const doneTodos = todos.filter((todo) => todo.status === true);
        if (!doneTodos.length) return;

        try {
          const response = doneTodos.map((todo) =>
            fetch(`${baseUrl}/todos/${todo.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
          );

          // 等待所有請求完成
          const result = await Promise.all(response);
          console.log("All completed todos deleted:", result);
          handleFetchTodos(token);
        } catch (error) {
          console.log(error);
        }
      };

      const handleDeleteTodo = async (id) => {
        try {
          const response = await fetch(`${baseUrl}/todos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              id: id,
            }),
          });

          const result = await response.json();
          console.log(result);
          handleFetchTodos(token);
        } catch (error) {
          console.log(error);
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
                            if (
                              editedTodo !== "" &&
                              editedTodo !== todo.content
                            ) {
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

    return (
      <div className="flex flex-col gap-y-4 max-w-[311px] md:max-w-[500px] w-full mx-auto">
        <TodoInput />
        {todos.length > 0 ? (
          <div className="bg-white rounded-custom shadow-custom">
            <TodoFilter activeTab={activeTab} setActiveTab={setActiveTab} />
            <Content />
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    );
  };

  return (
    <main className="bg-custom-gradient min-h-screen justify-end">
      <div className="max-w-[375px] md:max-w-[1028px] mx-auto flex flex-col gap-y-4 md:gap-y-10 pt-4 w-full">
        <NavBar />
        <TodoList />
      </div>
    </main>
  );
};

export default Dashboard;
