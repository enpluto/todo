import { RegisterOptions } from "react-hook-form";

type InputNameType = {
  email: string | undefined;
  password: string;
};

type InputName = keyof InputNameType;

type InputDataType = {
  labelName: string;
  htmlFor: InputName;
  placeholder: string;
  id: InputName;
  type: InputName;
  validation: RegisterOptions<InputNameType, InputName>;
};

export const inputDataset: InputDataType[] = [
  {
    labelName: "Email",
    htmlFor: "email",
    placeholder: "請輸入Email",
    id: "email",
    type: "email",
    validation: {
      required: "此欄位不可為空",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        message: "Email格式錯誤",
      },
    },
  },
  {
    labelName: "密碼",
    htmlFor: "password",
    placeholder: "請輸入密碼",
    id: "password",
    type: "password",
    validation: {
      required: "此欄位不可為空",
      minLength: { value: 6, message: "長度不足6個字" },
    },
  },
];
