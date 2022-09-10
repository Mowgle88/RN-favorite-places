const GOOGLE_API_KEY = 'AIzaSyAPn4GTja0uNPR-DB6xgS1QRr540w3fB9g';

interface IAdressResponse {
  results: IAdressResults[]
}

interface IAdressResults {
  address_components: IAdressResultsItem,
  formatted_address: string,
  geometry: {
    location: IlocationData
  },
  location_type: string,
  viewport: {
    northeast: IlocationData,
    southwest: IlocationData
  },
  place_id: string,
  types: string[]
}

interface IAdressResultsItem {
  long_name: string,
  short_name: string,
  types: string[]
}

interface IlocationData {
  lat: number,
  lng: number
}

export function getMapPreview(lat: number, lng: number) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
}

export async function getAdress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  // console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }

  const data: IAdressResponse = await response.json();
  // console.log(data);
  const address = data.results[0].formatted_address;
  return address;
}