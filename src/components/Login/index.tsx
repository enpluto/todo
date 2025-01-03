import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.tsx";
import { userLogin } from "../../reducers/auth/authActions.ts";
import InputField from "../InputField.tsx";
import { inputDataset } from "./data.ts";

export interface LoginDataType {
  email: string | undefined;
  password: string;
}

const Login = () => {
  const { state, dispatch, handlePageChange, localToken } = useAppContext();
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: storedEmail,
      password: "",
    },
  });

  useEffect(() => {
    if (localToken && state.token !== localToken) {
      dispatch({ type: "SET_TOKEN", payload: { token: localToken } });
    } else if (state.token) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate, state.token, localToken]);

  const handleLogin = async (data: LoginDataType) => {
    await userLogin({ dispatch, data, setError });
    navigate("/dashboard");
  };

  const initInputs = inputDataset.map((input) => (
    <InputField key={input.id} {...input} register={register} errors={errors} />
  ));

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
        onClick={() => handlePageChange("signup")}
      >
        註冊帳號
      </span>
    </form>
  );
};

export default Login;
