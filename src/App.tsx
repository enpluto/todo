import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
