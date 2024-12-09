import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import { userSignUp } from "../../reducers/auth/authActions";
import { inputDataset } from "./data";

export interface SignUpDataType {
  email: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const { handlePageChange } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUP = async (data: SignUpDataType) => {
    const isSuccess = await userSignUp({ data, setError });

    if (isSuccess) {
      localStorage.setItem("email", data.email);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "註冊成功",
        showConfirmButton: false,
        timer: 1500,
      });
      handlePageChange("login");
    }
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
        {errors[id] && (
          <span className="text-error font-bold text-sm">
            {errors[id]?.message}
          </span>
        )}
      </div>
    );
  });

  return (
    <form
      className="flex flex-col gap-y-6 mx-auto"
      onSubmit={handleSubmit(handleSignUP)}
    >
      <span className="text-xl md:text-2xl text-center md:text-left font-bold pt-4 md:pt-0">
        註冊帳號
      </span>
      <div className="flex flex-col gap-y-4">
        {initInputs}
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
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
      <button
        className="bg-black text-white rounded-custom px-12 py-3 font-bold max-w-[160px] m-auto"
        type="submit"
      >
        註冊帳號
      </button>
      <span
        className="font-bold text-center cursor-pointer"
        onClick={() => handlePageChange("login")}
      >
        登入
      </span>
    </form>
  );
};

export default SignUp;
