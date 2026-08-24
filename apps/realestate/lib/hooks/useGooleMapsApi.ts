import { useState, useCallback } from "react";

interface GeocodeResult {
  lat: number;
  lng: number;
  address: string;
}

interface UseGoogleMapsReturn {
  mapCenter: { lat: number; lng: number };
  geocodeAddress: (address: string) => Promise<GeocodeResult | null>;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  loading: boolean;
  error: string | null;
}

export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: -1.94995,
    lng: 30.05885, // Default to Kigali
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = useCallback(
    async (address: string): Promise<GeocodeResult | null> => {
      if (!address.trim()) {
        setError("Address cannot be empty.");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`
        );

        const data = await response.json();

        if (data.status === "OK") {
          const location = data.results[0].geometry.location;
          const formattedAddress = data.results[0].formatted_address;

          setMapCenter({ lat: location.lat, lng: location.lng });

          return {
            lat: location.lat,
            lng: location.lng,
            address: formattedAddress,
          };
        } else {
          setError(`Geocoding failed: ${data.status}`);
          return null;
        }
      } catch (err) {
        setError("An error occurred while fetching geocode data.");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    mapCenter,
    geocodeAddress,
    setMapCenter,
    loading,
    error,
  };
};
