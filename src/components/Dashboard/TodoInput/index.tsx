import { useState } from "react";
import { useAuth } from "../../../contexts/AppContext";
import { createTodo, fetchTodos } from "../../../reducers/todos/todoActions";

const TodoInput = () => {
  const [text, setText] = useState("");
  const { state, setTodos } = useAuth();
  const { token } = state;

  const handleTypeIn = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const handleCreateTodo = async (token: string, text: string) => {
    if (!text) return;
    await createTodo(token, text);
    setText("");
    handleFetchTodos(token);
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
          onClick={() => token && handleCreateTodo(token, text)}
        />
      </div>
    </div>
  );
};

export default TodoInput;
