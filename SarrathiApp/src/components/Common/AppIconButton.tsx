import React from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppIcon from './AppIcon';

interface AppIconButtonProps {
  library?: 'FontAwesome' | 'FontAwesome5' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Ionicons' | 'AntDesign' | 'Entypo' | 'Feather';
  name: string;
  size?: number;
  color?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
}

const AppIconButton: React.FC<AppIconButtonProps> = ({
  library = 'Ionicons',
  name,
  size = 24,
  color = '#000',
  onPress,
  style,
  disabled = false,
  backgroundColor = 'transparent',
  borderRadius = 8,
  padding = 8,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor,
          borderRadius,
          padding,
          opacity: disabled ? 0.5 : 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <AppIcon library={library} name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default AppIconButton;
