import { UnitResponseData } from "../lib/types/index";
import { API_URL, BACKEND_ORIGIN } from "../lib/api";

export async function fetchUnit(id: string): Promise<UnitResponseData> {
  const response = await fetch(`${API_URL}/units/public/${id}`, {
    headers: {
      Origin: BACKEND_ORIGIN,
      cache: "no-store",
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch unit data");
  }
  return response.json();
}
