import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  signInError: boolean;
  authError: boolean;
  loggedByPassword: boolean | null | undefined;
  passwordCreated: boolean;
  passwordConfirmed: boolean | null | undefined;
  password: string;
  confirmedPassword: string;
}

const passwordCreated = !!localStorage.getItem('password');
const passwordConfirmed = localStorage.getItem('password') ? true : null;
const password = localStorage.getItem('password') ?? '';

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  signInError: false,
  authError: false,

  loggedByPassword: null,
  passwordCreated: passwordCreated,
  passwordConfirmed: passwordConfirmed,
  password: '',
  confirmedPassword: password,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.signInError = false;
      state.authError = false;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setSignInError(state, action: PayloadAction<boolean>) {
      state.signInError = action.payload;
    },
    setAuthError(state, action: PayloadAction<boolean>) {
      state.authError = action.payload;
    },
    createPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      state.passwordCreated = true;
    },
    confirmPassword(state, action: PayloadAction<string>) {
      if (action.payload === state.password) {
        state.confirmedPassword = action.payload;
        state.passwordConfirmed = true;
        localStorage.setItem('password', action.payload);
        state.isAuthenticated = true;
      } else {
        // switch between null and false is need to made work useEffect
        state.passwordConfirmed = state.passwordConfirmed === false ? undefined : false;
      }
    },
    checkPassword(state, action: PayloadAction<string>) {
      if (action.payload === state.confirmedPassword) state.loggedByPassword = true;
      else state.loggedByPassword = state.loggedByPassword === false ? undefined : false;
    },
    resetPassword(state) {
      state.password = '';
      state.confirmedPassword = '';
      state.passwordCreated = false;
      state.passwordConfirmed = null;
      state.loggedByPassword = null;

      localStorage.removeItem('password');
    },
  },
});

export const {
  login,
  logout,
  setSignInError,
  setAuthError,
  createPassword,
  checkPassword,
  confirmPassword,
  resetPassword,
} = authSlice.actions;
export default authSlice.reducer;
