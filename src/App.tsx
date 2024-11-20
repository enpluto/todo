import Login from "./pages/login";
import SignUp from "./pages/signup";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");

  const SwitchPage = () => {
    return page === "login" ? (
      <Login setPage={setPage} />
    ) : (
      <SignUp setPage={setPage} />
    );
  };

  return (
    <main className="flex flex-col md:flex-row justify-evenly">
      <div className="flex flex-col gap-y-4 justify-center">
        <div className="flex justify-center">
          <img src="src/assets/check.svg" alt="" width="46" />
          <span className="text-[32px] font-bold font-baloo">
            ONLINE TODO LIST
          </span>
        </div>
        <img
          src="src/assets/image.svg"
          alt=""
          width="386"
          className="hidden md:block"
        />
      </div>
      {SwitchPage()}
    </main>
  );
}

export default App;
