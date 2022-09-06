import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutLinedButton from '../UI/OutLinedButton';
import { Colors } from '../../constants/colors';

export default function LocationPicker() {
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
    console.log(location);
  }

  function pickOnMapHandler() { }

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
  }
})