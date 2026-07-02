import { API_ENDPOINTS } from 'src/constants/api/api.constant';
import { ProfileResponse } from 'src/interface/Profile/profile.interface';
import apiClient from './apiClient';

export const userService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get<ProfileResponse>(
      API_ENDPOINTS.USER.PROFILE,
    );
    return response.data;
  },
};
