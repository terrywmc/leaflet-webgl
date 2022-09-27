import * as React from "react";
import { GetStaticProps } from "next";
import {
  getRandomGeoJson,
} from "../utils/getRandomGeoJson";
import dynamic from "next/dynamic";
import { unstable_useWebVitalsReport } from "next/streaming";
import { FeatureCollection } from "geojson";

interface HomeProps {
  geojson: FeatureCollection;
}

const MapWithNoSSR = dynamic(() => import("../components/MyMap"), {
  ssr: false,
});

const Home: React.FC<HomeProps> = ({ geojson }: HomeProps) => {
  unstable_useWebVitalsReport((data) => {
    console.log(data);
  });
  return (
    <>
      <MapWithNoSSR geojson={geojson} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const geojson: FeatureCollection = await getRandomGeoJson(1000);

  return {
    props: {
      geojson,
    },
  };
};

export default Home;
