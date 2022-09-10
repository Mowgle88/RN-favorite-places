import { StyleSheet } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import IconButton from '../components/UI/IconButton';

type MapProps = NativeStackScreenProps<RootStackParamList, 'Map'>;

export default function Map({ navigation, route }: MapProps) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>();

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  function selectLocationHandler(event: MapEvent) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation!.lat,
      pickedLng: selectedLocation!.lng
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          disabled={!selectedLocation}
          icon='save'
          size={24}
          color={tintColor!}
          onPress={savePickedLocationHandler} />
      )
    })
  }, [navigation, savePickedLocationHandler, initialLocation])

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