import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../constants/colors'
import OutLinedButton from '../components/UI/OutLinedButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PlaceDetailsProps = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

export default function PlaceDetails({ route }: PlaceDetailsProps) {
  function showOnMapHandler() {

  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {

  }, [selectedPlaceId])
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>ADDRESS</Text>
        </View>
        <OutLinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutLinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})