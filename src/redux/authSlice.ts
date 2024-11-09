import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Tokens = {
  refreshToken: string;
  accessToken: string;
}

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
  tokens: Tokens | null
}

const passwordCreated = !!localStorage.getItem('password');
const passwordConfirmed = localStorage.getItem('password') ? true : null;
const password = localStorage.getItem('password') ?? '';

const tokensExist = localStorage.getItem('tokens')
const tokens = tokensExist ? JSON.parse(tokensExist) : null

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
  tokens: tokens
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
      state.loggedByPassword = false;
      localStorage.removeItem('tokens');

    },
    setSignInError(state, action: PayloadAction<boolean>) {
      state.signInError = action.payload;
    },
    setAuthError(state, action: PayloadAction<boolean>) {
      state.authError = action.payload;
    },
    setTokens(state, action: PayloadAction<Tokens>) {
      state.tokens = action.payload
      localStorage.setItem('tokens', JSON.stringify(tokens));
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
      } else {
        // switch between null and false is need to made work useEffect
        state.passwordConfirmed = state.passwordConfirmed === false ? undefined : false;
      }
    },
    checkPassword(state, action: PayloadAction<string>) {
      if (action.payload === state.confirmedPassword) {
        state.loggedByPassword = true;
        state.isAuthenticated = true
      }
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
  setTokens,
  resetPassword,
} = authSlice.actions;
export default authSlice.reducer;
