import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  input: {
   height:57,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000',
    width: '100%',
  },
  errorBorder: {
    borderColor: '#E53935',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#E53935',
  },
});
