import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface OutLinedButtonProps {
  children: React.ReactNode,
  icon: keyof typeof Ionicons.glyphMap,
  onPress: () => void
}

export default function OutLinedButton({ children, icon, onPress }: OutLinedButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: Colors.primary500
  }
})