import { Alert, Button, StyleSheet, View, Text, Image } from 'react-native';
import React, { useState } from 'react';
// import * as ImgPick from 'expo-image-picker';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutLinedButton from '../UI/OutLinedButton';

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState('');
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {

    if (cameraPermissionInformation!.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted
    }

    if (cameraPermissionInformation!.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app'
      );
      return false;
    }

    return true;
  }

  async function TakeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!image.cancelled) {
      setPickedImage(image.uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLinedButton onPress={TakeImageHandler} icon={'camera'}>Take Image</OutLinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%',
  }
})