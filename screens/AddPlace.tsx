import { StyleSheet } from 'react-native';
import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../models/place';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { insertPlace } from '../util/database';

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;

export default function AddPlace({ navigation }: AddPlaceProps) {
  function createPlaceHandler(place: Place) {
    insertPlace(place);
    navigation.navigate('AllPlaces')
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

const styles = StyleSheet.create({})