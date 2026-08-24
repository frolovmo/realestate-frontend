import { authenticatedApiRequest } from "./authenticatedApi";

export async function deleteProperty(identifier: string): Promise<void> {
  const response = await authenticatedApiRequest(`/properties/${identifier}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Failed to delete property");
    throw new Error("Failed to delete property");
  }
}
