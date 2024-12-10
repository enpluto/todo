import { useState } from "react";
import { Todo, useAuth } from "../../../../contexts/AppContext";
import { editTodo } from "../../../../reducers/todos/todoActions";

const EditTodo = ({ todo }: { todo: Todo }) => {
  const { state, handleFetchTodos } = useAuth();
  const { token } = state;
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

export default EditTodo;
