import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const List = () => {
  const baseUrl = "https://todolist-api.hexschool.io";
  const navigate = useNavigate();
  const { token, nickname } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) {
      getTodos();
    } else {
      navigate("/");
    }
  }, [token]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${baseUrl}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();
      setTodos(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const NavBar = () => {
    const handleLogout = async () => {
      const baseUrl = "https://todolist-api.hexschool.io";

      if (!token) return;

      try {
        const response = await fetch(`${baseUrl}/users/sign_out`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "登出失敗");
        }

        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.log("錯誤:", error);
      }
    };

    return (
      <ul className="flex justify-between items-center w-full max-w-[311px] md:max-w-full mx-auto">
        <div className="flex justify-center items-center">
          <img src="src/assets/check.svg" alt="" width="40" />
          <span className="text-2xl font-bold font-baloo">
            ONLINE TODO LIST
          </span>
        </div>
        <ol className="flex gap-x-6">
          <li className="hidden md:block font-bold">{nickname}的待辦</li>
          <li className="cursor-pointer" onClick={handleLogout}>
            登出
          </li>
        </ol>
      </ul>
    );
  };

  const TodoList = () => {
    const [activeTab, setActiveTab] = useState("全部");

    const TextInput = () => {
      const [text, setText] = useState("");
      const handleTypeIn = (e) => setText(e.target.value);

      const handleCreateTodo = async () => {
        if (!text) return;

        try {
          const response = await fetch(`${baseUrl}/todos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              content: text,
            }),
          });

          setText("");
          const result = await response.json();
          console.log(result);
          getTodos();
        } catch (error) {
          console.log("錯誤:", error);
        }
      };

      return (
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between w-full bg-white rounded-custom shadow-custom">
            <input
              className="px-4 py-3 w-full rounded-custom"
              placeholder="新增待辦事項"
              type="text"
              value={text}
              onChange={handleTypeIn}
            />
            <img
              src="src/assets/plus.svg"
              alt=""
              className="cursor-pointer p-1"
              onClick={handleCreateTodo}
            />
          </div>
        </div>
      );
    };

    const Toggle = () => {
      const tabs = ["全部", "待完成", "已完成"];

      return (
        <ul className="flex justify-evenly font-bold">
          {tabs.map((item) => {
            return (
              <li
                className={`text-center w-full py-4 cursor-pointer border-b-2
                  ${activeTab === item ? "text-black border-black" : "text-darkGray border-lightGray"}`}
                onClick={() => setActiveTab(item)}
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
      );
    };

    const Content = () => {
      const handleChangeStatus = async (id) => {
        try {
          const response = await fetch(`${baseUrl}/todos/${id}/toggle`, {
            method: "PATCH",
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
          getTodos();
        } catch (error) {
          console.log(error);
        }
      };

      const sumUndone = todos.reduce((acc, todo) => {
        return acc + (todo.status === false ? 1 : 0);
      }, 0);

      return (
        <div className="p-4">
          <ul className="flex flex-col gap-y-4">
            {todos.map((todo) => (
              <li
                className="flex justify-between gap-x-4 border-b md:border-none border-lightGray"
                key={todo.id}
              >
                <div className="flex gap-x-4 items-center w-full pb-4 md:border-b border-lightGray">
                  {todo.status ? (
                    <img
                      src="src/assets/check_yellow.svg"
                      alt=""
                      onClick={() => handleChangeStatus(todo.id)}
                    />
                  ) : (
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      checked={todo.status}
                      onChange={() => handleChangeStatus(todo.id)}
                    />
                  )}

                  <span
                    className={todo.status ? "text-darkGray line-through" : ""}
                  >
                    {todo.content}
                  </span>
                </div>
                <img
                  src="src/assets/close.svg"
                  alt=""
                  className="pb-4 cursor-pointer"
                />
              </li>
            ))}
            <ol className="flex justify-between py-2">
              <li>{sumUndone} 個待完成項目</li>
              <li className="text-darkGray md:pr-8 cursor-pointer">
                清除已完成項目
              </li>
            </ol>
          </ul>
        </div>
      );
    };

    const EmptyList = () => {
      return (
        <div className="flex flex-col items-center gap-y-4 mt-11">
          <span className="">目前尚無待辦事項</span>
          <img src="src/assets/empty.svg" alt="" />
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-y-4 max-w-[311px] md:max-w-[500px] w-full mx-auto">
        <TextInput />
        {todos.length > 0 ? (
          <div className="bg-white rounded-custom shadow-custom">
            <Toggle />
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

export default List;
