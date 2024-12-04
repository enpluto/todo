export const initialState = {
  token: null,
  username: undefined,
  email: undefined,
};

interface AuthState {
  token: string | null;
  username?: string;
  email?: string;
}

export type AuthAction =
  | { type: "SIGNUP_SUCCESS"; payload: { email: string } }
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { token: string; username: string } };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        email: action.payload.email,
      };
    case "LOGIN_REQUEST":
      return { ...state };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    default:
      return state;
  }
};
