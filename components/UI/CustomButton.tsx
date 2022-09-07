import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { Colors } from '../../constants/colors';

interface CustomButtonProps {
  children: ReactNode,
  onPress: () => void,
}

export default function CustomButton({ children, onPress }: CustomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: Colors.primary50
  },
  pressed: {
    opacity: 0.7,
  }
})