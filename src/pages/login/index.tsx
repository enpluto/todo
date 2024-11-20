type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const Login = ({ setPage }: Props) => {
  return (
    <ul className="flex flex-col gap-y-6 max-w-[304px] w-full m-auto">
      <li className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        最實用的線上待辦事項服務
      </li>
      <ol className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請輸入Email"
            id="email"
            type="text"
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
            type="text"
          />
        </div>
      </ol>
      <button
        className="bg-black text-white rounded-custom px-12 py-3 font-bold max-w-[128px] m-auto"
        type="button"
      >
        登入
      </button>
      <li
        className="font-bold text-center cursor-pointer"
        onClick={() => setPage("signup")}
      >
        註冊帳號
      </li>
    </ul>
  );
};

export default Login;
