import { Dispatch } from "react";
import { UseFormSetError } from "react-hook-form";
import { LoginDataType } from "../../components/Login";
import { SignUpDataType } from "../../components/SignUp";
import { AuthAction } from "./authReducer";

const baseUrl = "https://todolist-api.hexschool.io";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

type UserSignUpParams = {
  data: SignUpDataType;
  setError: UseFormSetError<SignUpDataType>;
};

type UserLoginParams = {
  dispatch: Dispatch<AuthAction>;
  data: LoginDataType;
  setError: UseFormSetError<LoginDataType>;
};

type UserLogoutParams = {
  dispatch: Dispatch<AuthAction>;
  token: string;
};

export const userSignUp = async ({ data, setError }: UserSignUpParams) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign_up`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        nickname: data.username,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        setError("email", {
          type: "manual",
          message: errorData.message,
        });
      }
      return false;
    }
    const result = await response.json();
    if (result.status) return true;
  } catch (error) {
    return false;
  }
};

export const userLogin = async ({
  dispatch,
  data,
  setError,
}: UserLoginParams) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign_in`, {
      method: "POST",
      headers: headers,
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
        payload: { token: userData.token },
      });
      localStorage.setItem("email", data.email as string);
      localStorage.setItem("localToken", userData.token);
      localStorage.setItem("username", userData.nickname);
    }
  } catch (error) {
    throw error;
  }
};

export const userLogout = async ({ token, dispatch }: UserLogoutParams) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign_out`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Logout failed.");
    }
    const result = await response.json();
    if (result.status) {
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
      localStorage.removeItem("localToken");
      localStorage.removeItem("username");
    }
  } catch (error) {
    throw error;
  }
};
