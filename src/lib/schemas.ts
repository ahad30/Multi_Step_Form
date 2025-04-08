import { z } from "zod";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Provide an valid email address"),
  phoneNumber: z.string().min(10, "Phone number is required, must be at least 10 digits"),
});

const addressDetailsSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Zip code is required, must be at least 5 digits").regex(/^\d+$/, "Zip code must contain only numbers"),
});

const accountSetupSchema = z.object({
  username: z.string().min(4, "Username is required, must be at least 4 characters"),
  password: z.string().min(6, "Password is required, must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
});

export const formSchema = personalInfoSchema.merge(addressDetailsSchema).merge(accountSetupSchema);

export type PersonalInfoFields = z.infer<typeof personalInfoSchema>;
export type AddressDetailsFields = z.infer<typeof addressDetailsSchema>;
export type AccountSetupFields = z.infer<typeof accountSetupSchema>;
export type FormFields = z.infer<typeof formSchema>;