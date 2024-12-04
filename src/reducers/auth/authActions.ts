import { Dispatch } from "react";
import { UseFormSetError } from "react-hook-form";
import { LoginDataType } from "../../components/Login";
import { AuthAction } from "./authReducer";

const baseUrl = "https://todolist-api.hexschool.io";

type UserLoginParams = {
  dispatch: Dispatch<AuthAction>;
  data: LoginDataType;
  setError: UseFormSetError<LoginDataType>;
};

export const userLogin = async ({
  dispatch,
  data,
  setError,
}: UserLoginParams) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        setError("email", {
          type: "manual",
          message: errorData.message,
        });
        setError("password", {
          type: "manual",
          message: errorData.message,
        });
      } else if (response.status === 404) {
        setError("email", {
          type: "manual",
          message: "用戶不存在",
        });
      }
    } else {
      const userData = await response.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: userData.token, username: userData.nickname },
      });
    }
  } catch (error) {
    throw error;
  }
};
