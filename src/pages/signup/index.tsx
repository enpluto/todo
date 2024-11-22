type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const SignUp = ({ setPage }: Props) => {
  return (
    <ul className="flex flex-col gap-y-6 mx-auto">
      <li className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        註冊帳號
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
          <label className="text-sm font-bold" htmlFor="name">
            您的暱稱
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請輸入您的暱稱"
            id="name"
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
        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-bold" htmlFor="check">
            再次輸入密碼
          </label>
          <input
            className="rounded-custom px-4 py-3"
            placeholder="請再次輸入密碼"
            id="check"
            type="text"
          />
        </div>
      </ol>
      <button
        className="bg-black text-white rounded-custom px-12 py-3 font-bold max-w-[160px] m-auto"
        type="button"
      >
        註冊帳號
      </button>
      <li
        className="font-bold text-center cursor-pointer"
        onClick={() => setPage("login")}
      >
        登入
      </li>
    </ul>
  );
};

export default SignUp;
