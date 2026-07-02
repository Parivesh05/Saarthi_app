import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppIcon, { Icons } from '../components/Common/AppIcon';
import AppIconButton from '../components/Common/AppIconButton';
import { colors } from '../styles/theme/colors';
import AppButton from '../components/Common/AppButton';

/**
 * This is an example screen showing how to use icons in your app
 * You can copy the examples you need to other screens
 */
const IconExampleScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Icon Examples</Text>

      {/* Social Media Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media Icons</Text>
        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <AppIcon library="FontAwesome" name="facebook" size={40} color="#1877F2" />
            <Text style={styles.iconLabel}>Facebook</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="MaterialCommunityIcons" name="gmail" size={40} color="#EA4335" />
            <Text style={styles.iconLabel}>Gmail</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="FontAwesome" name="whatsapp" size={40} color="#25D366" />
            <Text style={styles.iconLabel}>WhatsApp</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="FontAwesome" name="google" size={40} color="#4285F4" />
            <Text style={styles.iconLabel}>Google</Text>
          </View>
        </View>
      </View>

      {/* Arrow Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Arrow Icons</Text>
        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="arrow-forward" size={40} color="#333" />
            <Text style={styles.iconLabel}>Right</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="arrow-back" size={40} color="#333" />
            <Text style={styles.iconLabel}>Left</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="arrow-up" size={40} color="#333" />
            <Text style={styles.iconLabel}>Up</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="arrow-down" size={40} color="#333" />
            <Text style={styles.iconLabel}>Down</Text>
          </View>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="chevron-forward" size={40} color="#333" />
            <Text style={styles.iconLabel}>Chevron R</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="chevron-back" size={40} color="#333" />
            <Text style={styles.iconLabel}>Chevron L</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="chevron-up" size={40} color="#333" />
            <Text style={styles.iconLabel}>Chevron U</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon library="Ionicons" name="chevron-down" size={40} color="#333" />
            <Text style={styles.iconLabel}>Chevron D</Text>
          </View>
        </View>
      </View>

      {/* Icon Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Buttons</Text>
        <View style={styles.iconRow}>
          <AppIconButton
            library="FontAwesome"
            name="facebook"
            size={24}
            color="#fff"
            backgroundColor="#1877F2"
            borderRadius={50}
            padding={12}
            onPress={() => console.log('Facebook pressed')}
          />
          <AppIconButton
            library="MaterialCommunityIcons"
            name="gmail"
            size={24}
            color="#fff"
            backgroundColor="#EA4335"
            borderRadius={50}
            padding={12}
            onPress={() => console.log('Gmail pressed')}
          />
          <AppIconButton
            library="FontAwesome"
            name="whatsapp"
            size={24}
            color="#fff"
            backgroundColor="#25D366"
            borderRadius={50}
            padding={12}
            onPress={() => console.log('WhatsApp pressed')}
          />
        </View>
      </View>

      {/* Using Predefined Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Using Predefined Icons</Text>
        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <AppIcon {...Icons.heart} size={40} color="#E74C3C" />
            <Text style={styles.iconLabel}>Heart</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon {...Icons.star} size={40} color="#F39C12" />
            <Text style={styles.iconLabel}>Star</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon {...Icons.location} size={40} color="#3498DB" />
            <Text style={styles.iconLabel}>Location</Text>
          </View>
          <View style={styles.iconItem}>
            <AppIcon {...Icons.notification} size={40} color="#9B59B6" />
            <Text style={styles.iconLabel}>Notification</Text>
          </View>
        </View>
      </View>

      {/* Code Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Examples</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`// Simple Icon\n<AppIcon library="FontAwesome" name="facebook" size={24} color="#1877F2" />\n\n// Using predefined icons\n<AppIcon {...Icons.whatsapp} size={30} color="#25D366" />\n\n// Icon Button\n<AppIconButton\n  library="MaterialCommunityIcons"\n  name="gmail"\n  size={24}\n  color="#fff"\n  backgroundColor="#EA4335"\n  onPress={() => handlePress()}\n/>`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  codeBlock: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#f8f8f2',
    lineHeight: 20,
  },
});

export default IconExampleScreen;
