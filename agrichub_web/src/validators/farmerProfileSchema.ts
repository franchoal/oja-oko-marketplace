import { z } from "zod";

export const farmerProfileSchema = z.object({
  farm_name: z
    .string()
    .min(3, "Farm name must be at least 3 characters."),

  farm_location: z
    .string()
    .min(3, "Farm location is required."),

  farm_description: z
    .string()
    .min(
      20,
      "Farm description must be at least 20 characters."
    ),
});

export type FarmerProfileFormData = z.infer<
  typeof farmerProfileSchema
>;