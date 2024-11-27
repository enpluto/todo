import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type LoginProps = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  email: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const Login = ({ setPage, email, setToken }: LoginProps) => {
  const {
    register,
    handleSubmit,
    defaultValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: email,
      password: "",
    },
  });
  const { setNickname } = useAuth();
  const navigate = useNavigate();

  const onsubmit = async (data) => {
    const baseUrl = "https://todolist-api.hexschool.io";

    try {
      const response = await fetch(`${baseUrl}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        switch (response.status) {
          case 401:
            setError("email", {
              type: "manual",
              message: errorData.message,
            });
            setError("password", {
              type: "manual",
              message: errorData.message,
            });
            break;
          case 404:
            setError("email", {
              type: "manual",
              message: "用戶不存在",
            });
            break;
        }
      }

      const userData = await response.json();
      setToken(userData.token);
      setNickname(userData.nickname);
      navigate("/dashboard");
    } catch (error) {
      console.log("錯誤:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-6 mx-auto"
      onSubmit={handleSubmit(onsubmit)}
    >
      <span className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        最實用的線上待辦事項服務
      </span>
      <ol className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請輸入Email"
            id="email"
            type="email"
            {...register("email", {
              required: "此欄位不可為空",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                message: "Email格式錯誤",
              },
            })}
          />
          {errors.email && (
            <span className="text-error font-bold text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="password">
            密碼
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請輸入密碼"
            id="password"
            type="password"
            {...register("password", {
              required: "此欄位不可為空",
              minLength: { value: 6, message: "長度不足6個字" },
            })}
          />
          {errors.password && (
            <span className="text-error font-bold text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
      </ol>
      <button
        className="bg-black text-white rounded-custom px-12 py-3 font-bold max-w-[128px] m-auto"
        type="submit"
      >
        登入
      </button>
      <span
        className="font-bold text-center cursor-pointer"
        onClick={() => setPage("signup")}
      >
        註冊帳號
      </span>
    </form>
  );
};

export default Login;
