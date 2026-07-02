import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { appFontNames } from "src/assets/fonts";

export const styles = StyleSheet.create ({
 container:{
    flex:1, justifyContent:'center', alignItems:'center',gap:10,padding:10
 },
 welcomeText:{
   color:colors.BLACK,fontSize:22,fontWeight:'bold',fontFamily: appFontNames.Inter_Regular,lineHeight:35
 },
 friendText:{
   fontSize:16
 },
 cloudText:{
   position:'absolute', top:60, left:45, fontSize:16, zIndex:1,color:colors.WHITE,fontWeight:'bold',
 },
 buttonText:{fontSize: 18, fontWeight: 'bold',color:colors.WHITE },
 buttonStyle:{
  marginTop: 20, width: '70%', borderRadius: 40,elevation:5,backgroundColor:colors.BUTTON_BACKGROUND
 },
 marginTop10:{ marginTop: 10 },
  logo:{
   width:250,height:250, resizeMode:'contain',borderRadius:60
 },
});