import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  AuthState,
  LoginFormValues,
  LoginResponse,
} from 'src/interface/Auth/login.interface';
import { SignupFormValues } from 'src/interface/Auth/signup.interface';
import { authService } from 'src/services/authService';
import { setAuthToken } from 'src/services/apiClient';
import { userService } from 'src/services/userService';
import { authStorage } from 'src/services/authStorage';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isProfileLoading: false,
  isRestoring: true,
  error: null,
  isAuthenticated: false,
};

/**
 * Async thunk for login — calls authService, never raw axios.
 */
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginFormValues,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials);
    // Set token on the global axios instance
    setAuthToken(data.data.access_token);
    await authStorage.saveSession(data.data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message =
      error.response?.data?.message || error.message || 'Login failed';
    return rejectWithValue(message);
  }
});

export const signupUser = createAsyncThunk<
  LoginResponse,
  SignupFormValues,
  { rejectValue: string }
>('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    const data = await authService.signup(payload);
    setAuthToken(data.data.access_token);
    await authStorage.saveSession(data.data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message =
      error.response?.data?.message || error.message || 'Signup failed';
    return rejectWithValue(message);
  }
});

export const restoreAuthSession = createAsyncThunk<
  LoginResponse['data'] | null,
  void,
  { rejectValue: string }
>('auth/restoreSession', async (_, { rejectWithValue }) => {
  try {
    const session = await authStorage.getSession();
    if (session?.access_token) {
      setAuthToken(session.access_token);
    }
    return session;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Session restore failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authStorage.clearSession();
  setAuthToken(null);
});

export const fetchUserProfile = createAsyncThunk<
  LoginResponse['data']['user'],
  void,
  { rejectValue: string }
>('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const data = await userService.getProfile();
    return data.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message =
      error.response?.data?.message || error.message || 'Profile fetch failed';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isProfileLoading = false;
      state.isRestoring = false;
      state.error = null;
      setAuthToken(null);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<LoginResponse['data']['user']>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Something went wrong';
        state.isAuthenticated = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.token = action.payload.data.access_token;
          state.refreshToken = action.payload.data.refresh_token;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Something went wrong';
        state.isAuthenticated = false;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.token = action.payload.data.access_token;
          state.refreshToken = action.payload.data.refresh_token;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(fetchUserProfile.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<LoginResponse['data']['user']>) => {
          state.isProfileLoading = false;
          state.user = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isProfileLoading = false;
        state.error = action.payload ?? 'Something went wrong';
      })
      .addCase(restoreAuthSession.pending, (state) => {
        state.isRestoring = true;
        state.error = null;
      })
      .addCase(
        restoreAuthSession.fulfilled,
        (state, action: PayloadAction<LoginResponse['data'] | null>) => {
          state.isRestoring = false;
          state.user = action.payload?.user ?? null;
          state.token = action.payload?.access_token ?? null;
          state.refreshToken = action.payload?.refresh_token ?? null;
          state.isAuthenticated = Boolean(action.payload?.access_token);
          state.error = null;
        },
      )
      .addCase(restoreAuthSession.rejected, (state, action) => {
        state.isRestoring = false;
        state.error = action.payload ?? 'Session restore failed';
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isProfileLoading = false;
        state.isRestoring = false;
        state.error = null;
      });
  },
});

export const { logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
