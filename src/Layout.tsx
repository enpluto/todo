import Login from "./pages/login";
import SignUp from "./pages/signup";
import { useState } from "react";

function Layout() {
  const [page, setPage] = useState("login");

  const SwitchPage = () => {
    return page === "login" ? (
      <Login setPage={setPage} />
    ) : (
      <SignUp setPage={setPage} />
    );
  };

  return (
    <main className="pt-12 md:pt-20 max-w-[375px] md:max-w-[1028px] mx-auto flex flex-col md:flex-row justify-evenly items-center">
      {/* left section */}
      <div className="flex flex-col gap-y-4 justify-center w-full max-w-[386px]">
        {/* logo */}
        <div className="flex justify-center">
          <img src="src/assets/check.svg" alt="" width="46" />
          <span className="text-[32px] font-bold font-baloo">
            ONLINE TODO LIST
          </span>
        </div>
        {/* image */}
        <img
          src="src/assets/image.svg"
          alt=""
          width="386"
          className="hidden md:block"
        />
      </div>
      {/* right section */}
      <div className="max-w-[304px] w-full mx-auto md:mx-0">{SwitchPage()}</div>
    </main>
  );
}

export default Layout;
