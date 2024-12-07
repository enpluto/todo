import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo, useAuth } from "../../contexts/AuthContext";
import { fetchTodos } from "../../reducers/todos/todoActions";
import EmptyList from "./EmptyList";
import NavBar from "./NavBar";
import TodoFilter from "./TodoFilter";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

interface TodoContainerProps {
  todos: Todo[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("全部");
  const { state, todos, setTodos } = useAuth();
  const navigate = useNavigate();

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  useEffect(() => {
    if (!state.token) {
      navigate("/");
    } else {
      handleFetchTodos(state.token);
    }
  }, [state.token]);

  const TodoContainer = ({
    todos,
    activeTab,
    setActiveTab,
  }: TodoContainerProps) => {
    const hasTodo = todos.length > 0;

    return hasTodo ? (
      <div className="bg-white rounded-custom shadow-custom">
        <TodoFilter activeTab={activeTab} setActiveTab={setActiveTab} />
        <TodoList activeTab={activeTab} />
      </div>
    ) : (
      <EmptyList />
    );
  };

  return (
    <main className="bg-custom-gradient min-h-screen justify-end">
      <div className="max-w-[375px] md:max-w-[1028px] mx-auto flex flex-col gap-y-4 md:gap-y-10 pt-4 w-full">
        <NavBar />
        <div className="flex flex-col gap-y-4 max-w-[311px] md:max-w-[500px] w-full mx-auto">
          <TodoInput />
          <TodoContainer
            todos={todos}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
