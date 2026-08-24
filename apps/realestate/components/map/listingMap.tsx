"use client";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map as GMap,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useGoogleMaps } from "@/lib/hooks/useGooleMapsApi";
import { PropertiesListResponseData, PropertyData } from "@/lib/types";

interface MapProps {
  propertiesList: PropertiesListResponseData;
}

interface MarkerData {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

export default function ListingMap({ propertiesList }: MapProps) {
  const { geocodeAddress } = useGoogleMaps();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const { data } = propertiesList;

  const getFullAddress = (property: PropertyData): string => {
    return `${property.province}, ${property.district}, ${property.sector}, ${property.cell}, ${property.village}, ${property.address}`;
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const newMarkers: MarkerData[] = [];
      for (const property of data) {
        const fullAddress = getFullAddress(property);
        const result = await geocodeAddress(fullAddress);
        if (result) {
          newMarkers.push({
            lat: result.lat,
            lng: result.lng,
            address: result.address,
            name: property.name,
          });
        }
      }
      setMarkers(newMarkers);
    };

    fetchMarkers().catch((err) =>
      console.error("Failed to fetch markers:", err)
    );
  }, [data, geocodeAddress]);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? ""}
      language="en"
    >
      <GMap
        center={markers[0] || { lat: -1.94995, lng: 30.05885 }} // Default to Kigali if no markers
        style={{ width: "100%", height: "100%" }}
        defaultZoom={8}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name} // Display the property name on hover
            onClick={() => setSelectedMarker(marker)} // Open info window on click
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h4>{selectedMarker.name}</h4>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GMap>
    </APIProvider>
  );
}
