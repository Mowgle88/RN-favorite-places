import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useIsFocused } from '@react-navigation/native';
import { Place } from '../models/place';
import { fetchPlaces } from '../util/database';

type AllPlacesProps = NativeStackScreenProps<RootStackParamList, 'AllPlaces'>;

export default function AllPlaces({ route }: AllPlacesProps) {

  const [loadedPlaces, setloadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setloadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setloadedPlaces(curPlaces => [...curPlaces, route.params.place])
    }
  }, [isFocused])

  return (
    <PlacesList places={loadedPlaces} />
  )
}

const styles = StyleSheet.create({})