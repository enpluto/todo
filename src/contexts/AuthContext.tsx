import { createContext, ReactNode, useState, useContext } from "react";

interface AuthContextType {
  token: string | null;
  email: string | null;
  nickname: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setNickname: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ token, email, nickname, setEmail, setToken, setNickname }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) return;

  return context;
};

export default AuthProvider;
