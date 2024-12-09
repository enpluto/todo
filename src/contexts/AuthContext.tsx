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

interface AuthContextType {
  page: "login" | "signup";
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleFetchTodos: (token: string) => Promise<void>;
  handlePageChange: (page: "login" | "signup") => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [page, setPage] = useState<"login" | "signup">("login");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleFetchTodos = async (token: string) => {
    const todoDataset = await fetchTodos(token);
    setTodos(todoDataset);
  };

  const handlePageChange = (page: "login" | "signup") => {
    setPage(page);
  };

  return (
    <AuthContext.Provider
      value={{
        page,
        todos,
        setTodos,
        state,
        dispatch,
        handleFetchTodos,
        handlePageChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
