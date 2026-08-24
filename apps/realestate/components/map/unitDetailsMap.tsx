"use client";
import { useEffect } from "react";
import { APIProvider, Map as GMap, Marker } from "@vis.gl/react-google-maps";
import { useGoogleMaps } from "../../lib/hooks/useGooleMapsApi";

interface MapProps {
  address: string;
}

export default function UnitDetailsMap({ address }: MapProps) {
  const { mapCenter, geocodeAddress } = useGoogleMaps();

  // Geocode the address whenever it changes
  useEffect(() => {
    if (address) {
      geocodeAddress(address).catch((err) =>
        console.error("Failed to geocode address:", err)
      );
    }
  }, [address, geocodeAddress]);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? ""}
      language="en"
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <GMap
        defaultZoom={13}
        zoomControl
        center={mapCenter}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker position={mapCenter} />
      </GMap>
    </APIProvider>
  );
}
