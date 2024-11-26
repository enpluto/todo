type LoginProps = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  email: string | null;
};

const Login = ({ setPage, email }: LoginProps) => {
  return (
    <form className="flex flex-col gap-y-6 mx-auto">
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
          />
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
          />
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
