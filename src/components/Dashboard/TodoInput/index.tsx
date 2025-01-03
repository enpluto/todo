import { useState } from "react";
import plusIcon from "../../../assets/plus.svg";
import { useAppContext } from "../../../contexts/AppContext";
import { createTodo } from "../../../reducers/todos/todoActions";

const TodoInput = () => {
  const [text, setText] = useState("");
  const { state, handleFetchTodos } = useAppContext();
  const { token } = state;

  const handleTypeIn = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

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
          src={plusIcon}
          alt="plus icon"
          className="cursor-pointer p-1"
          onClick={() => token && handleCreateTodo(token, text)}
        />
      </div>
    </div>
  );
};

export default TodoInput;
