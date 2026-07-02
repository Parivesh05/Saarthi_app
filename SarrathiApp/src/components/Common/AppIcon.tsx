import React from 'react';
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

// Define icon library types
type IconLibrary =
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'Feather';

interface AppIconProps {
  library?: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({
  library = 'Ionicons',
  name,
  size = 24,
  color = '#000',
  style,
  onPress,
}) => {
  const iconProps = {
    name: name as any,
    size,
    color,
    style,
    onPress,
  };

  switch (library) {
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'AntDesign':
      return <AntDesign {...iconProps} />;
    case 'Entypo':
      return <Entypo {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'Ionicons':
    default:
      return <Ionicons {...iconProps} />;
  }
};

export default AppIcon;

// Predefined common icons for easy access
export const Icons = {
  // Social Media
  facebook: { library: 'FontAwesome' as IconLibrary, name: 'facebook' },
  facebookSquare: { library: 'FontAwesome' as IconLibrary, name: 'facebook-square' },
  google: { library: 'FontAwesome' as IconLibrary, name: 'google' },
  gmail: { library: 'MaterialCommunityIcons' as IconLibrary, name: 'gmail' },
  whatsapp: { library: 'FontAwesome' as IconLibrary, name: 'whatsapp' },
  instagram: { library: 'FontAwesome' as IconLibrary, name: 'instagram' },
  twitter: { library: 'FontAwesome' as IconLibrary, name: 'twitter' },
  linkedin: { library: 'FontAwesome' as IconLibrary, name: 'linkedin' },

  // Arrows
  arrowRight: { library: 'Ionicons' as IconLibrary, name: 'arrow-forward' },
  arrowLeft: { library: 'Ionicons' as IconLibrary, name: 'arrow-back' },
  arrowUp: { library: 'Ionicons' as IconLibrary, name: 'arrow-up' },
  arrowDown: { library: 'Ionicons' as IconLibrary, name: 'arrow-down' },
  chevronRight: { library: 'Ionicons' as IconLibrary, name: 'chevron-forward' },
  chevronLeft: { library: 'Ionicons' as IconLibrary, name: 'chevron-back' },
  chevronUp: { library: 'Ionicons' as IconLibrary, name: 'chevron-up' },
  chevronDown: { library: 'Ionicons' as IconLibrary, name: 'chevron-down' },

  // Common UI Icons
  home: { library: 'Ionicons' as IconLibrary, name: 'home' },
  search: { library: 'Ionicons' as IconLibrary, name: 'search' },
  settings: { library: 'Ionicons' as IconLibrary, name: 'settings' },
  menu: { library: 'Ionicons' as IconLibrary, name: 'menu' },
  close: { library: 'Ionicons' as IconLibrary, name: 'close' },
  check: { library: 'Ionicons' as IconLibrary, name: 'checkmark' },
  user: { library: 'Ionicons' as IconLibrary, name: 'person' },
  mail: { library: 'Ionicons' as IconLibrary, name: 'mail' },
  phone: { library: 'Ionicons' as IconLibrary, name: 'call' },
  lock: { library: 'Ionicons' as IconLibrary, name: 'lock-closed' },
  eye: { library: 'Ionicons' as IconLibrary, name: 'eye' },
  eyeOff: { library: 'Ionicons' as IconLibrary, name: 'eye-off' },
  heart: { library: 'Ionicons' as IconLibrary, name: 'heart' },
  heartOutline: { library: 'Ionicons' as IconLibrary, name: 'heart-outline' },
  star: { library: 'Ionicons' as IconLibrary, name: 'star' },
  starOutline: { library: 'Ionicons' as IconLibrary, name: 'star-outline' },
  camera: { library: 'Ionicons' as IconLibrary, name: 'camera' },
  image: { library: 'Ionicons' as IconLibrary, name: 'image' },
  location: { library: 'Ionicons' as IconLibrary, name: 'location' },
  notification: { library: 'Ionicons' as IconLibrary, name: 'notifications' },
  cart: { library: 'Ionicons' as IconLibrary, name: 'cart' },
};
