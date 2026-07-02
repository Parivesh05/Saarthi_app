import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { appFontNames } from "src/assets/fonts";

export const styles = StyleSheet.create ({
 container:{
    flex:1, justifyContent:'center', alignItems:'center',backgroundColor:colors.APP_BACKGROUND
 },
 logo:{
   width:250,height:250, resizeMode:'contain',borderRadius:60
 },
 helloText:{
  fontFamily: appFontNames.Inter_Regular, fontSize: 55, color:colors.APP_TEXT 
 },
  welcomeText:{
   fontSize: 20, color:colors.BLACK, textAlign:'center',fontFamily: appFontNames.Inter_Regular,
  }
});