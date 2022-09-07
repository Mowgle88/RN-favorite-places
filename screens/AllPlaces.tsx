import { StyleSheet } from 'react-native';
import React from 'react';
import PlacesList from '../components/Places/PlacesList';

export default function AllPlaces() {
  return (
    <PlacesList places={[]} />
  )
}

const styles = StyleSheet.create({})