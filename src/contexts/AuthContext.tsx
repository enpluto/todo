import { createContext, ReactNode, useState, useContext } from "react";

interface AuthContextType {
  email: string | undefined;
  page: string;
  token: string | undefined;
  username: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<string>("login");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        email,
        page,
        token,
        username,
        setEmail,
        setPage,
        setToken,
        setUsername,
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
