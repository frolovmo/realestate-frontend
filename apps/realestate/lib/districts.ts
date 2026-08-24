import locationData from "./rwanda.json";

const districts = locationData.data.provinces.flatMap((province) =>
  province.districts.map((district) => district.name)
);

export default districts;
