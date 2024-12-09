import { FieldValues } from "react-hook-form";
import { LoginInputType } from "./Login/data";
import { SignUpInputType } from "./SignUp/data";

type InputFieldProps = (LoginInputType | SignUpInputType) & {
  register: any;
  errors: FieldValues;
};

const InputField = ({
  id,
  htmlFor,
  labelName,
  placeholder,
  type,
  validation,
  register,
  errors,
}: InputFieldProps) => (
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
export default InputField;
