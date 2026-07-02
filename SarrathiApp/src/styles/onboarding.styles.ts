import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './theme/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  /* ---------- Screen ---------- */
  container: {
    height: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.APP_BACKGROUND, width: '100%',
  },

  /* ---------- Progress Bar ---------- */
  progressBg: {
    height: 15,
    width: '85%',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    overflow: 'hidden',
   margin:20
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.BUTTON_BACKGROUND,
    borderRadius: 10, elevation: 5
  },

  /* ---------- Question ---------- */
  question: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },

  /* ---------- Options ---------- */
  optionContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  optionSelected: {
    backgroundColor: '#F8FFF9',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
    width: '80%',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.BUTTON_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.BUTTON_BACKGROUND,
  },

  /* ---------- Owl ---------- */
  owl: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  owlBottom: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  owlRight: {
    position: 'absolute',
    right: -20,
    bottom: 130,

  },
  loginTextButton: { fontSize: 18, color: colors.WHITE, fontWeight: '500' },
  loginButton: {
    marginTop: 20, width: '90%', borderRadius: 40, elevation: 5, backgroundColor: colors.BUTTON_BACKGROUND,
  },   
  logo:{
   width:150,height:150, resizeMode:'contain',borderRadius:30
 },

});
