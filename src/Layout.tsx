import checkIcon from "./assets/check.svg";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useAuth } from "./contexts/AuthContext";

function Layout() {
  const { page } = useAuth();

  return (
    <main className="pt-12 md:pt-20 max-w-[375px] md:max-w-[1028px] mx-auto flex flex-col md:flex-row justify-evenly items-center">
      {/* left section */}
      <div className="flex flex-col gap-y-4 justify-center w-full max-w-[386px]">
        {/* logo */}
        <div className="flex justify-center">
          <img src={checkIcon} alt="check icon" width="46" />
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
      <div className="max-w-[304px] w-full mx-auto md:mx-0">
        {page === "login" ? <Login /> : <SignUp />}
      </div>
    </main>
  );
}

export default Layout;
