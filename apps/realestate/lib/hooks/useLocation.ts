import { useState, useMemo } from "react";
import locationData from "../rwanda.json";

export type LocationData = {
  districts: {
    name: string;
    sectors: {
      name: string;
      cells: {
        name: string;
        villages: string[];
      }[];
    }[];
  }[];
  sectors: {
    name: string;
    cells: {
      name: string;
      villages: string[];
    }[];
  }[];
  cells: {
    name: string;
    villages: string[];
  }[];
  villages: string[];
  setSelectedProvince: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSector: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCell: React.Dispatch<React.SetStateAction<string | null>>;
};

interface ILocationDataHook {
  initialData?: {
    province?: string;
    district?: string;
    sector?: string;
    cell?: string;
  } | null;
}

export function useLocationData(options?: ILocationDataHook): LocationData {
  const { initialData } = options || {}
  const { province, district, sector, cell } = initialData || {};

  const [selectedProvince, setSelectedProvince] = useState<string | null>(province || null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(district || null);
  const [selectedSector, setSelectedSector] = useState<string | null>(sector || null);
  const [selectedCell, setSelectedCell] = useState<string | null>(cell || null);

  const districts = useMemo(() => {
    return selectedProvince
      ? locationData.data.provinces.find((p) => p.name === selectedProvince)
          ?.districts || []
      : [];
  }, [selectedProvince]);

  const sectors = useMemo(() => {
    return selectedDistrict
      ? districts.find((d) => d.name === selectedDistrict)?.sectors || []
      : [];
  }, [selectedDistrict, districts]);

  const cells = useMemo(() => {
    return selectedSector
      ? sectors.find((s) => s.name === selectedSector)?.cells || []
      : [];
  }, [selectedSector, sectors]);

  const villages = useMemo(() => {
    return selectedCell
      ? cells.find((c) => c.name === selectedCell)?.villages || []
      : [];
  }, [selectedCell, cells]);

  return {
    districts,
    sectors,
    cells,
    villages,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedSector,
    setSelectedCell,
  };
}
