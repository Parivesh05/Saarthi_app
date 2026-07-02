// AppCheckbox.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from 'src/styles/theme/colors';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const AppCheckbox = ({ label, selected, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
      <View style={[styles.circle, selected && styles.circleSelected]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#F8FFF9',
  },
  text: {
    fontSize: 16,
    width: '80%',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
  },
  circleSelected: {
    backgroundColor: colors.BUTTON_BACKGROUND,
  },
});
