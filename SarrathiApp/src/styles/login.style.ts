import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
    backgroundColor: colors.APP_BACKGROUND,
    width: '100%',
    minHeight: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
    color: colors.TEXT_PRIMARY,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: colors.GREY,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  socialTitle: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: colors.GREY,
    marginTop: 18,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  buttonText: {
    fontSize: 14,
    color: colors.TEXT_PRIMARY,
    fontWeight: '700',
  },
  socialRow: {
    flexDirection: 'row',
    width: '94%',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    elevation: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: '#DDE2EE',
    padding: 0,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 0,
    marginBottom: 8,
  },
  loginTextButton: { fontSize: 16, color: colors.WHITE, fontWeight: '700' },
  loginButton: {
    marginTop: 16,
    width: '94%',
    height: 52,
    borderRadius: 16,
    elevation: 0,
    backgroundColor: colors.BUTTON_BACKGROUND,
  },
    formikMainContainer: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInputStyle:{
    height: 52,
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    elevation: 0,
    paddingLeft: 18,
    borderColor: '#DDE2EE',
  },
  width94:{
    width: '100%',
    marginTop: 8,
  },
  signInContainer:{
    marginTop: 20,
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.TEXT_PRIMARY,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.PRIMARY,
    textDecorationLine: 'underline',
  },
  owlIcon:{
    width:120,height:140,position:"absolute",bottom:10,right:10
 },
   logo:{
   width:112,height:112, resizeMode:'contain',borderRadius:30
 },
});
