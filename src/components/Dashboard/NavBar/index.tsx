import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { userLogout } from "../../../reducers/auth/authActions";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { username, token } = state;

  const handleLogout = async (token: string) => {
    if (token) await userLogout({ token, dispatch });
    navigate("/");
  };

  return (
    <ul className="flex justify-between items-center w-full max-w-[311px] md:max-w-full mx-auto">
      <div className="flex justify-center items-center">
        <img src="src/assets/check.svg" alt="" width="40" />
        <span className="text-2xl font-bold font-baloo">ONLINE TODO LIST</span>
      </div>
      <ol className="flex gap-x-6">
        <li className="hidden md:block font-bold">{username}的待辦</li>
        <li
          className="cursor-pointer"
          onClick={() => token && handleLogout(token)}
        >
          登出
        </li>
      </ol>
    </ul>
  );
};

export default NavBar;