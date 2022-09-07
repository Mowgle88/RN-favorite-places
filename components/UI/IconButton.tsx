import { Pressable, StyleProp, StyleSheet, View, ViewProps } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap,
  size: number,
  color: string,
  disabled?: boolean,
  onPress: () => void
}

export default function IconButton({ icon, size, color, onPress, disabled }: IconButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.opacityStyle]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7
  },
  opacityStyle: {
    opacity: 0.5
  }
})