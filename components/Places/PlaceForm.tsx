import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import CustomButton from '../UI/CustomButton';

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number }>();

  function ChangeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: { lat: number, lng: number }) => {
    setPickedLocation(location);
  }, [])

  function savePlaceHandler() {
    console.log(enteredTitle);
    console.log(selectImage);
    console.log(pickedLocation);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={enteredTitle} onChangeText={ChangeTitleHandler} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLacation={pickLocationHandler} />
      <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})