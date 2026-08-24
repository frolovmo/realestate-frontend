import locationData from "../../lib/rwanda.json";

const provinces = () => {
  return locationData.data.provinces;
};

const districts = () => {
  return provinces().flatMap((province) => province.districts);
};

const sectors = () => {
  return districts().flatMap((district) => district.sectors);
};

const cells = () => {
  return sectors().flatMap((sector) => sector.cells);
};

const extractOptions = (
  units: {
    name: string;
  }[]
) => {
  return units.map((unit) => ({
    value: unit.name,
    label: unit.name,
  }));
};

export const provincesOptions = extractOptions(provinces());
export const districtsOptions = extractOptions(districts());
export const sectorsOptions = extractOptions(sectors());
export const cellsOptions = extractOptions(cells());

type SelectOption = {
  value: string;
  label: string;
};

export interface LocationSelectOptions {
  provincesOptions: SelectOption[];
  districtsOptions: SelectOption[];
  sectorsOptions: SelectOption[];
  cellsOptions: SelectOption[];
}
