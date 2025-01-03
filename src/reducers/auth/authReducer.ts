export const initialState = {
  token: null,
};

export interface AuthState {
  token: string | null;
}

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { token: string } }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "SET_TOKEN"; payload: { token: string } };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
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
