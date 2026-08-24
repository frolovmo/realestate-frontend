import { z } from "zod";
import {
  HOUSE_PREFERENCE,
  MARITAL_STATUS,
  NUMERIC_INPUT_MAX_LIMIT,
} from "../constants";
import { isValidPhoneNumber } from "react-phone-number-input";
const isValidRwandaNationalID = (id: string) => {
  // Remove spaces for validation
  const numericId = id.replace(/\s/g, "");
  // Check if it contains exactly 16 digits
  return /^\d{16}$/.test(numericId);
};

const fileSchema = z.object({
  fileId: z.string(),
  file: z.instanceof(File),
  preview: z.string(),
  altText: z.string(),
});

export const CreateApplicationSchema = z
  .object({
    status: z.string().min(1, "Marital status is required"),
    address: z.string().min(1, "Street address is required field"),
    province: z.string().min(1, "Province is required field"),
    district: z.string().min(1, "District is required field"),
    sector: z.string().min(1, "Sector is required field"),
    cell: z.string().min(1, "Cell is required field"),
    village: z.string().min(1, "Village is required field"),
    employmentStatus: z.string().min(1, "Employment status is required field"),
    profession: z.string().min(1, "Profession is required field"),
    employerName: z.string().optional(),
    

    monthlyIncome: z.coerce
      .number()
      .nonnegative("Must be non negative value")
      .gte(1, "Must be at least 1 RWF")
      .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded"),

    proofOfIncome: z
      .array(fileSchema)
      .min(1, "Add minimum 1 file")
      .max(1, "1 file is maximum"),
    maritalStatus: z
      .array(fileSchema)
      .min(1, "Add minimum 1 file")
      .max(1, "1 file is maximum"),
    isSameLocationForSpouse: z.boolean(),
    spouseIdentificationNumber: z
      .string()
      .refine(isValidRwandaNationalID, {
        message: "Invalid National ID (must be 16 digits)",
      })
      .optional(),
    spousePhoneNumber: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .optional(),
    spouseAddress: z.string().optional(),
    spouseProvince: z.string().optional(),
    spouseDistrict: z.string().optional(),
    spouseSector: z.string().optional(),
    spouseCell: z.string().optional(),
    spouseVillage: z.string().optional(),
    spouseEmploymentStatus: z.string().optional(),
    spouseProfession: z.string().optional(),
    spouseMonthlyIncome: z.coerce
      .number()
      .nonnegative("Must be non negative value")
      .lte(NUMERIC_INPUT_MAX_LIMIT, "The maximum limit is exceeded")
      .optional(),
    spouseProofOfIncome: z.array(fileSchema).optional(),
    housePreference: z.enum(
      [HOUSE_PREFERENCE.fromDeveloper, HOUSE_PREFERENCE.typology],
      {
        errorMap: () => ({ message: "House Preference is required field" }),
      }
    ),
    propertyName: z.string().optional(),
    unitName: z.string().optional(),
    typology: z.string().optional(),
    location: z.string().optional(),
    secondTypology: z.string().optional(),
    secondLocation: z.string().optional(),
    houseRange: z.string().optional(),
    downPayment: z.boolean(),
    insuranceCover: z.boolean(),
    loanProvider: z.string().min(1, "Loan Provider is required field"),
  })
  .superRefine((data, ctx) => {
    const requiredSpouseFields = [];
    if (data.status === MARITAL_STATUS.married) {
      requiredSpouseFields.push(
        {
          key: "spouseIdentificationNumber",
          message: "National ID is required",
        },
        { key: "spousePhoneNumber", message: "Phone number is required" },
        {
          key: "spouseEmploymentStatus",
          message: "Employment status is required",
        },
        { key: "spouseProfession", message: "Profession is required" },
        { key: "spouseMonthlyIncome", message: "Monthly income is required" },
        { key: "spouseProofOfIncome", message: "Proof of income is required" }
      );

      if (!data.isSameLocationForSpouse) {
        requiredSpouseFields.push({
          key: "spouseAddress",
          message: "Street address is required",
        });
      }

      requiredSpouseFields.forEach(({ key, message }) => {
        if (!data[key as keyof typeof data]) {
          ctx.addIssue({
            code: "custom",
            path: [key],
            message,
          });
        }
      });

      if (!data.isSameLocationForSpouse) {
        const addressFields = [
          { key: "spouseProvince", message: "Province is required" },
          { key: "spouseDistrict", message: "District is required" },
          { key: "spouseSector", message: "Sector is required" },
          { key: "spouseCell", message: "Cell is required" },
          { key: "spouseVillage", message: "Village is required" },
        ];

        addressFields.forEach(({ key, message }) => {
          if (!data[key as keyof typeof data]) {
            ctx.addIssue({
              code: "custom",
              path: [key],
              message,
            });
          }
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.housePreference === HOUSE_PREFERENCE.fromDeveloper) {
      if (!data.propertyName) {
        ctx.addIssue({
          code: "custom",
          path: ["propertyName"],
          message: "Property name is required",
        });
      }
      if (!data.unitName) {
        ctx.addIssue({
          code: "custom",
          path: ["unitName"],
          message: "Unit name is required",
        });
      }
      if (!data.houseRange) {
        ctx.addIssue({
          code: "custom",
          path: ["houseRange"],
          message: "House range is required",
        });
      }
    } else if (data.housePreference === HOUSE_PREFERENCE.typology) {
      if (!data.typology) {
        ctx.addIssue({
          code: "custom",
          path: ["typology"],
          message: "House typology is required",
        });
      }
      if (!data.location) {
        ctx.addIssue({
          code: "custom",
          path: ["location"],
          message: "House location is required",
        });
      }

      if (
        data.location &&
        data.secondLocation &&
        data.location === data.secondLocation
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["secondLocation"],
          message: "First and second location must not match",
        });
      }
    }
  });
