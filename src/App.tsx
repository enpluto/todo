import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import List from "./pages/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/dashboard" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
