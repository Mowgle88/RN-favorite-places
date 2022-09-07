import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import OutLinedButton from '../UI/OutLinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreview } from '../../util/location';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;
type MapScreenRouteProp = RouteProp<RootStackParamList, 'AddPlace'>;

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number }>();
  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const navigation = useNavigation<MapScreenNavigationProp>();
  const route = useRoute<MapScreenRouteProp>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

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

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location taken yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    )
  }

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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})