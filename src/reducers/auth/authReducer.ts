export const initialState = {
  token: null,
};

interface AuthState {
  token: string | null;
  username?: string;
}

export type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { token: string; username: string } };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
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