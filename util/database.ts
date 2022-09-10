import * as SQLite from 'expo-sqlite';
import { SQLError, SQLStatementErrorCallback, SQLTransaction } from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error): any => {
          reject(error);
        }
      )
    });
  })
  return promise;
}

export function insertPlace(place: Place) {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          // console.log(result);
          resolve();
        },
        (_, error): any => {
          console.log(reject(error))
          reject(error);
        }
      )
    });
  })
}

export function fetchPlaces() {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id: string) {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
}