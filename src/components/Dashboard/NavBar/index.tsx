import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, nickname } = useAuth();

  const handleLogout = async () => {
    const baseUrl = "https://todolist-api.hexschool.io";

    if (!token) return;

    try {
      const response = await fetch(`${baseUrl}/users/sign_out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "登出失敗");
      }

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log("錯誤:", error);
    }
  };

  return (
    <ul className="flex justify-between items-center w-full max-w-[311px] md:max-w-full mx-auto">
      <div className="flex justify-center items-center">
        <img src="src/assets/check.svg" alt="" width="40" />
        <span className="text-2xl font-bold font-baloo">ONLINE TODO LIST</span>
      </div>
      <ol className="flex gap-x-6">
        <li className="hidden md:block font-bold">{nickname}的待辦</li>
        <li className="cursor-pointer" onClick={handleLogout}>
          登出
        </li>
      </ol>
    </ul>
  );
};

export default NavBar;
