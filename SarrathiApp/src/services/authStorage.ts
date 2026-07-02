import * as SecureStore from 'expo-secure-store';
import { AuthResponseData } from 'src/interface/Auth/login.interface';

const AUTH_SESSION_KEY = 'ubuddy_auth_session';

export const authStorage = {
  saveSession: async (session: AuthResponseData) => {
    await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session));
  },

  getSession: async (): Promise<AuthResponseData | null> => {
    const storedSession = await SecureStore.getItemAsync(AUTH_SESSION_KEY);
    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as AuthResponseData;
    } catch {
      await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
      return null;
    }
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
  },
};
