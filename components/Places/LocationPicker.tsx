import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutLinedButton from '../UI/OutLinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreview } from '../../util/location';

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number }>();

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermissionInformation!.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted
    }

    if (locationPermissionInformation!.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app'
      );
      return false;
    }

    return true;
  }

  async function getLocetionHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    // console.log(location);

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  let locationPreview = <Text>No location taken yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    )
  }

  function pickOnMapHandler() { }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutLinedButton icon={'location'} onPress={getLocetionHandler}>Locate User</OutLinedButton>
        <OutLinedButton icon={'map'} onPress={pickOnMapHandler}>Pick on Map</OutLinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})