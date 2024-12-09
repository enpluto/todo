import { RegisterOptions } from "react-hook-form";

type InputNameType = {
  email: string;
  username: string;
  password: string;
};

type InputName = "email" | "username" | "password";

export interface SignUpInputType {
  labelName: string;
  htmlFor: InputName;
  placeholder: string;
  id: InputName;
  type: "email" | "text" | "password";
  validation: RegisterOptions<InputNameType, InputName>;
}

export const inputDataset: SignUpInputType[] = [
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
    labelName: "您的暱稱",
    htmlFor: "username",
    placeholder: "請輸入您的暱稱",
    id: "username",
    type: "text",
    validation: {
      required: "此欄位不可為空",
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
