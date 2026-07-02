import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { styles } from 'src/styles/appButton.style';
import { colors } from 'src/styles/theme/colors';
import AppIcon from './AppIcon';

type IconLibrary = 'FontAwesome' | 'FontAwesome5' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Ionicons' | 'AntDesign' | 'Entypo' | 'Feather';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: ImageSourcePropType;
  // Icon library props (alternative to image icon)
  iconLibrary?: IconLibrary;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  backgroundColor ='',
  textColor = colors.WHITE,
  icon,
  iconLibrary,
  iconName,
  iconSize = 20,
  iconColor,
  iconPosition = 'left',
  style,
  textStyle,
  disabled = false,
}) => {
  const renderIcon = () => {
    if (iconLibrary && iconName) {
      return (
        <AppIcon
          library={iconLibrary}
          name={iconName}
          size={iconSize}
          color={iconColor || textColor}
          style={iconPosition === 'left' ? { marginRight: 8 } : { marginLeft: 8 }}
        />
      );
    }
    if (icon) {
      return <Image source={icon} style={styles.icon} />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
    >
      <View style={styles.content}>
        {iconPosition === 'left' && renderIcon()}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
        {iconPosition === 'right' && renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
