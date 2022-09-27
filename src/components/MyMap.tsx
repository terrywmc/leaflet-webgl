import { useEffect, useState } from "react";

import L, { LeafletMouseEvent } from "leaflet";
import glify from "leaflet.glify";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// import { GeoJsonFeatureCollection, GeoJsonFeaturePoint } from "../utils/getRandomGeoJson";

import { FeatureCollection, Feature } from "geojson";

type Props = {
  geojson: FeatureCollection;
};

const MyMap: React.FC<Props> = (props: Props) => {
  const { geojson } = props;

  const [points, setPoints] = useState<FeatureCollection | null>();
  const [map, setMap] = useState<L.Map>();

  useEffect(() => {
    if (!map)
      setMap(
        L.map("map", {
          zoom: 2,
          minZoom: 2,
          maxZoom: 16,
        }).setView([0, 0])
      );
  }, [map]);

  useEffect(() => {
    setPoints(geojson);
  }, [geojson]);

  useEffect(() => {
    if (map) {
      map.setMaxBounds(map.getBounds());

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      glify.points({
        map: map,
        data: points,
        size: (i: number) => {
          return Math.random() * 17 + 3;
        },
        hover: (e: LeafletMouseEvent, feature: Feature) => {
          console.log("hovered on Point", feature, e);
        },
        click: (e: LeafletMouseEvent, feature: Feature<any>) => {
          //set up a standalone popup (use a popup as a layer)
          console.log(feature);
          L.popup()
            .setLatLng(feature.geometry.coordinates)
            .setContent(
              `You clicked the point at longitude:${e.latlng.lng}, latitude:${e.latlng.lat}`
            )
            .openOn(map);

          console.log("clicked on Point", feature, e);
        },
      });
    }
  }, [map, points]);

  return <div id="map" style={{ height: "100vh" }} />;
};

export default MyMap;
