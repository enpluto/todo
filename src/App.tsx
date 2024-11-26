import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import List from "./pages/list";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard" element={<List />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
