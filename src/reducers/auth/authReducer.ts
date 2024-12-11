export const initialState = {
  token: null,
  username: undefined,
};

export interface AuthState {
  token: string | null;
  username?: string;
}

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { token: string; username: string } }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "SET_TOKEN"; payload: { token: string } };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        token: null,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
