import { getRandomInRange } from "./getRandomInRange";

import { FeatureCollection,Feature } from 'geojson';

export type longitude = number;
export type latitude = number;

// export interface GeoJsonFeaturePoint {
//   type: string;
//   properties?:{
//     [key: string]: any;
//   }
//   geometry: {
//     type: string; //GeoJSON supports other types
//     coordinates: [longitude, latitude];
//     properties?:{
//       [key: string]: any;
//     }
//   };
// }

// export interface GeoJsonFeatureLine {
//   type: string;

//   geometry: {
//     type: string; //GeoJSON supports other types
//     coordinates: number[][];
//     properties?:{
//       [key: string]: any;
//     }
//   };
// }

// export type GeoJsonFeature = GeoJsonFeaturePoint|GeoJsonFeatureLine

// export interface GeoJsonFeatureCollection {
//   type: string;
//   features: GeoJsonFeature[];
// }


export const getSingleGeoJsonFeature = (): Feature=> {
  // const long: longitude = getRandomInRange(-180, 180, 3);
  // const lat: latitude = getRandomInRange(-180, 180, 3);
  const long: longitude = getRandomInRange(-60, 60, 3);
  const lat: latitude = getRandomInRange(-180, 180, 3);

  return {
    type: "Feature",
    geometry: {
      type: "Point", //GeoJSON supports other types

      coordinates: [long, lat],
    },
    properties:{},
  };
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
};

export const getRandomGeoJson = (
  range: number = 10
): FeatureCollection => {
  // const features = Array(...Array(range)).reduce((acc, item, i) => {
  //   const feature = getSingleGeoJsonFeature();
  //   acc.push(feature)
  //   return acc
  // }
  // , []);

  const features = Array.from({ length: range }, () =>
    getSingleGeoJsonFeature()
  );
  return {
    type: "FeatureCollection",
    features: features,
  };
};
