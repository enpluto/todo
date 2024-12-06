import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
