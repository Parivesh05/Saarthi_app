/**
 * Environment configuration for the app.
 * Replace these values with your actual environment-specific configs.
 */

const ENV = {
  DEV: {
    API_BASE_URL: 'https://ubuddy-jrz8.onrender.com/api',
    CHAT_API_BASE_URL: 'http://98.70.36.107:8000',
    CHAT_CLIENT_ID: 'Ubuddy180426',
  },
  STAGING: {
    API_BASE_URL: 'https://ubuddy-jrz8.onrender.com/api',
    CHAT_API_BASE_URL: 'http://98.70.36.107:8000',
    CHAT_CLIENT_ID: 'Ubuddy180426',
  },
  PROD: {
    API_BASE_URL: 'https://ubuddy-jrz8.onrender.com/api',
    CHAT_API_BASE_URL: 'http://98.70.36.107:8000',
    CHAT_CLIENT_ID: 'Ubuddy180426',
  },
};

const currentEnv = __DEV__ ? 'DEV' : 'PROD';

export const AppConfig = {
  ...ENV[currentEnv],
  TIMEOUT: 30000,
};
