import { useForm } from "react-hook-form";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const SignUp = ({ setPage }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const baseUrl = "https://todolist-api.hexschool.io";

    try {
      const response = await fetch(`${baseUrl}/users/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      const uid = result.uid;
      setPage("login");
    } catch (error) {
      console.log("錯誤:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-6 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        註冊帳號
      </span>
      {/* form */}
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
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="name">
            您的暱稱
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請輸入您的暱稱"
            id="name"
            type="text"
            {...register("nickname", { required: "此欄位不可為空" })}
          />
          {errors.nickname && (
            <span className="text-error font-bold text-sm">
              {errors.nickname.message}
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
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="confirmPassword">
            再次輸入密碼
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請再次輸入密碼"
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "此欄位不可為空",
              minLength: { value: 6, message: "長度不足6個字" },
              validate: (value) =>
                value === getValues("password") || "請再次確認密碼",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-error font-bold text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </ol>
      <button
        className="bg-black text-white rounded-custom px-12 py-3 font-bold max-w-[160px] m-auto"
        type="submit"
      >
        註冊帳號
      </button>
      <span
        className="font-bold text-center cursor-pointer"
        onClick={() => setPage("login")}
      >
        登入
      </span>
    </form>
  );
};

export default SignUp;
