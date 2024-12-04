import { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { userLogin } from "../../reducers/auth/authActions.ts";
import { authReducer, initialState } from "../../reducers/auth/authReducer.ts";
import { inputDataset } from "./data.ts";

export interface LoginDataType {
  email: string | undefined;
  password: string;
}

const Login = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { email, setPage, setUsername } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: email,
      password: "",
    },
  });

  useEffect(() => {
    if (state.token) {
      setUsername(state.username);
      navigate("/dashboard");
    }
  }, [state.token]);

  const handleLogin = async (data: LoginDataType) => {
    await userLogin({ dispatch, data, setError });
  };

  const initInputs = inputDataset.map((input) => {
    const { htmlFor, labelName, placeholder, id, type, validation } = input;

    return (
      <div className="flex flex-col gap-y-1" key={id}>
        <label className="text-sm font-bold" htmlFor={htmlFor}>
          {labelName}
        </label>
        <input
          className="rounded-custom px-4 py-3"
          placeholder={placeholder}
          id={id}
          type={type}
          {...register(id, validation)}
        />
        {errors[id as keyof typeof errors] && (
          <span className="text-error font-bold text-sm">
            {errors[id as keyof typeof errors]?.message}
          </span>
        )}
      </div>
    );
  });

  return (
    <form
      className="flex flex-col gap-y-6 mx-auto"
      onSubmit={handleSubmit(handleLogin)}
    >
      <span className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        最實用的線上待辦事項服務
      </span>
      <div className="flex flex-col gap-y-4">{initInputs}</div>
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
