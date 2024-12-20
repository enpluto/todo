import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import {
  AuthAction,
  authReducer,
  AuthState,
  initialState,
} from "../reducers/auth/authReducer";
import { fetchTodos } from "../reducers/todos/todoActions";

export interface Todo {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

interface AppContextType {
  localToken: string | null;
  page: "login" | "signup";
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  todos: Todo[];
  handleFetchTodos: (token: string) => Promise<void>;
  handlePageChange: (page: "login" | "signup") => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [page, setPage] = useState<"login" | "signup">("login");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const localToken = localStorage.getItem("localToken");

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const handlePageChange = (page: "login" | "signup") => {
    setPage(page);
  };

  return (
    <AppContext.Provider
      value={{
        localToken,
        page,
        todos,
        state,
        dispatch,
        handleFetchTodos,
        handlePageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AuthProvider");
  }
  return context;
};

export default AppProvider;
