import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap,
  size: number,
  color: string,
  onPress: () => void
}

export default function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      {/* <View style={styles.buttonContainer}> */}
      <Ionicons name={icon} size={size} color={color} />
      {/* </View> */}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  // buttonContainer: {
  //   borderRadius: 24,
  //   padding: 6,
  //   marginHorizontal: 8,
  //   marginVertical: 2
  // },
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7
  }
})