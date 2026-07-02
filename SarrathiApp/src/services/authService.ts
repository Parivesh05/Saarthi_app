import { AxiosError } from 'axios';
import apiClient from './apiClient';
import { LoginFormValues } from 'src/interface/Auth/login.interface';
import { LoginResponse } from 'src/interface/Auth/login.interface';
import { SignupFormValues } from 'src/interface/Auth/signup.interface';
import { API_ENDPOINTS } from 'src/constants/api/api.constant';

/**
 * Auth API service — all auth-related HTTP calls.
 */
export const authService = {
  login: async (credentials: LoginFormValues): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return response.data;
  },
  signup: async (payload: SignupFormValues): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload,
    );
    return response.data;
  },
};
