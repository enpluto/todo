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

export interface Todo {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

interface AuthContextType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [page, setPage] = useState<string>("login");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{ page, setPage, state, dispatch, todos, setTodos }}
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
