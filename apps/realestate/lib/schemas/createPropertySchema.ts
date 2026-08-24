import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const CreatePropertySchema = z.object({
  name: z
    .string()
    .min(3, "Property name must contain at least 3 character(s)")
    .max(50, "Maximum characters is exceeded"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 character(s)")
    .max(200, "200 characters is maximum"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  images: z
    .object({
      fileId: z.string(),
      file: z.instanceof(File).optional(),
      preview: z.string(),
      altText: z.string(),
      isInit: z.boolean().optional(),
    })
    .array()
    .nonempty("Add minimum 5 images")
    .min(5, "Add minimum 5 images")
    .max(10, "10 images is maximum"),
  address: z.string().optional(),
  province: z.string().min(1, "Province is required field"),
  district: z.string().min(1, "District is required field"),
  sector: z.string().min(1, "Sector is required field"),
  cell: z.string().min(1, "Cell is required field"),
  village: z.string().min(1, "Village is required field"),
});
