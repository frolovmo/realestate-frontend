import { object, z } from "zod";
import { NUMERIC_INPUT_MAX_LIMIT } from "../constants";

export const CreateUnitSchema = z.object({
  name: z.string().min(1, "Unit name is required"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 character(s)")
    .max(200, "200 characters is maximum"),
  images: z
    .object({
      fileId: z.string(),
      file: z.instanceof(File).optional(),
      preview: z.string(),
      altText: z.string(),
      isInit: z.boolean().optional(),
      type: z.string().optional(),
    })
    .array()
    .nonempty("Add minimum 3 images")
    .min(3, "Add minimum 3 images")
    .max(10, "10 images is maximum"),
  floorPlan: z
    .object({
      fileId: z.string(),
      file: z.instanceof(File).optional(),
      preview: z.string(),
      altText: z.string(),
      isInit: z.boolean().optional(),
      type: z.string().optional(),
    })
    .array()
    .nonempty("Add minimum 1 pdf file")
    .min(1, "Add minimum 1 pdf file")
    .max(3, "3 pdf files is maximum"),
  tourVideo: z
    .object({
      fileId: z.string(),
      file: z.instanceof(File).optional(),
      preview: z.string(),
      altText: z.string(),
      isInit: z.boolean().optional(),
      type: z.string().optional(),
    })
    .array()
    .nonempty("Add minimum 1 video file")
    .min(1, "Add minimum 1 video file")
    .max(1, "Only 1 video file required"),
  availableUnits: z.coerce
    .number()
    .nonnegative("Non negative")
    .gte(1, "Must be at least 1")
    .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),
  unitType: z.string().min(1, "Select unit type"),
  developmentStage: z.string().min(1, "District is required"),
  square: z.coerce
    .number()
    .nonnegative("Must be non negative value")
    .gte(1, "Must be at least 1 square meter")
    .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),
  bedrooms: z.coerce
    .number()
    .nonnegative("Must be non negative value")
    .gte(1, "Must be at least 1 bedroom")
    .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),
  bathrooms: z.coerce
    .number()
    .nonnegative("Must be non negative value")
    .gte(1, "Must be at least 1 bathroom")
    .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),
  cost: z.coerce
    .number()
    .nonnegative("Must be non negative value")
    .gte(1, "Must be at least 1 RWF")
    .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),
  facilities: object({
    balcony: z.boolean().default(false).optional(),
    elevator: z.boolean().default(false).optional(),
    garden: z.boolean().default(false).optional(),
    smartHome: z.boolean().default(false).optional(),
    solar: z.boolean().default(false).optional(),
    wheelChair: z.boolean().default(false).optional(),
  }),
  customFacilities: z.string().array(),
  location: z.string().optional(),
});
