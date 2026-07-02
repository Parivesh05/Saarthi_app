import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { styles } from 'src/styles/appTextInput.style';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle, error && styles.errorBorder]}
        placeholderTextColor="#999"
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;
