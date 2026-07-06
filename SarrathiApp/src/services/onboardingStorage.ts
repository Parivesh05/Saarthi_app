import * as SecureStore from 'expo-secure-store';

const ONBOARDING_DONE_KEY = 'ubudy_onboarding_done';

export const onboardingStorage = {
  async isCompleted() {
    const value = await SecureStore.getItemAsync(ONBOARDING_DONE_KEY);
    return value === 'true';
  },
  async markCompleted() {
    await SecureStore.setItemAsync(ONBOARDING_DONE_KEY, 'true');
  },
};
