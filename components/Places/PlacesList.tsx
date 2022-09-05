import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Place } from '../../models/place';
import PlaceItem from './PlaceItem';

interface PlacesListProps {
  places: Place[]
}

export default function PlacesList({ places }: PlacesListProps) {

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => { }} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16
  }
})