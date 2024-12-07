import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import EmptyList from "./EmptyList";
import NavBar from "./NavBar";
import TodoFilter from "./TodoFilter";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("全部");
  const { state, todos } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.token) {
      navigate("/");
    }
  }, [state.token]);

  return (
    <main className="bg-custom-gradient min-h-screen justify-end">
      <div className="max-w-[375px] md:max-w-[1028px] mx-auto flex flex-col gap-y-4 md:gap-y-10 pt-4 w-full">
        <NavBar />
        <div className="flex flex-col gap-y-4 max-w-[311px] md:max-w-[500px] w-full mx-auto">
          <TodoInput />
          {todos.length > 0 ? (
            <div className="bg-white rounded-custom shadow-custom">
              <TodoFilter activeTab={activeTab} setActiveTab={setActiveTab} />
              <TodoList activeTab={activeTab} />
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
