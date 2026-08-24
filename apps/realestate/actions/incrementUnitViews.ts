import { API_URL, BACKEND_ORIGIN } from "../lib/api";

export async function incrementUnitViews(identifier: string): Promise<void> {
  const response = await fetch(`${API_URL}/units/${identifier}/views`, {
    method: "PATCH",
    headers: {
      Origin: BACKEND_ORIGIN,
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    console.error(`Failed to increment views for unit ${identifier}`);
  }
}
