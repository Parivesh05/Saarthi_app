/**
 * API endpoint constants.
 * Centralized place for all endpoint paths.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    PROFILE: '/user/profile',
  },
  CHAT: {
    SEND: '/chat',
  },
} as const;
