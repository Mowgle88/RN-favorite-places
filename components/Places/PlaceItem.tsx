import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Place } from '../../models/place';

interface PlaceItemProps {
  place: Place,
  onSelect: () => void
}

export default function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})