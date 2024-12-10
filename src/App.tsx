import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import AuthProvider from "./contexts/AppContext";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
