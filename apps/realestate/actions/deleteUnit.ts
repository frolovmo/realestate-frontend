import { authenticatedApiRequest } from "./authenticatedApi";

export async function deleteUnit(identifier: string): Promise<void> {
  const response = await authenticatedApiRequest(`/units/${identifier}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Failed to delete unit");
    throw new Error("Failed to delete unit");
  }
}
