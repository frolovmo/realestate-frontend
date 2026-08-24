// import { revalidatePath } from "next/cache";
import { authenticatedApiRequest } from "@/actions/authenticatedApi";

export async function updateProperty(
  propertyId: string,
  totalUnits: number,
  occupiedUnits: number
) {
  if (occupiedUnits > totalUnits) {
    throw new Error("Total units should be more than occupied units");
  }

  try {
    const response = await authenticatedApiRequest(`/properties/${propertyId}`, {
      method: "PUT",
      body: { totalUnits, occupiedUnits },
    });

    if (!response.ok) {
      throw new Error("Failed to update property units");
    }

    // revalidatePath(`/properties/${propertyId}`);
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
}
