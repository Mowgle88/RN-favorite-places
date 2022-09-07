import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MapView, { MapEvent, Marker } from 'react-native-maps';

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  function selectLocationHandler(event: MapEvent) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker
        title='Picked Lacation'
        coordinate={{
          latitude: selectedLocation!.lat,
          longitude: selectedLocation!.lng
        }} />}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})