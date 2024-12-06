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
  | { type: "LOGOUT_SUCCESS" };

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
    default:
      return state;
  }
};
