export interface SessionState {
  email: string;
  password: string;
}

export const initialState: SessionState = {
  email: "",
  password: "",
};

export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";

interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string;
}

interface SetPasswordAction {
  type: typeof SET_PASSWORD;
  payload: string;
}

export type SessionActionTypes = SetEmailAction | SetPasswordAction;

export const setEmail = (email: string): SetEmailAction => ({
  type: SET_EMAIL,
  payload: email,
});

export const setPassword = (password: string): SetPasswordAction => ({
  type: SET_PASSWORD,
  payload: password,
});

export const sessionReducer = (
  state: SessionState,
  action: SessionActionTypes
): SessionState => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
