import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

const LANGUAGE_KEY = '@app_language';

export const useLanguage = () => {
  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const getCurrentLanguage = () => i18n.language;

  return {
    changeLanguage,
    loadSavedLanguage,
    getCurrentLanguage,
  };
};
