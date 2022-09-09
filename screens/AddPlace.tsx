import { StyleSheet } from 'react-native';
import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../models/place';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;

export default function AddPlace({ navigation }: AddPlaceProps) {
  function createPlaceHandler(place: Place) {
    navigation.navigate('AllPlaces', {
      place: place
    })
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

const styles = StyleSheet.create({})