import { z } from "zod";

// Define the Zod schema for TProduct
const productSchemaValidationZod = z.object({
  name: z.string().trim().nonempty("Name is required"),
  description: z.string().trim().nonempty("Description is required"),
  price: z
    .number({ required_error: "Price must be required!" })
    .min(0, "Price must be a positive number"),
  category: z.string().trim().nonempty("Category is required"),
  tags: z
    .array(z.string().trim().nonempty("Tag must be a non-empty string"))
    .nonempty("Tags are required"),
  variants: z
    .array(
      z.object({
        type: z.string().trim().nonempty("Variant type is required"),
        value: z.string().trim().nonempty("Variant value is required"),
      }),
    )
    .nonempty("Variants are required"),
  inventory: z
    .object({
      quantity: z
        .number()
        .int()
        .min(0, "Quantity must be a non-negative integer"),
      inStock: z.boolean(),
    })
    .refine(
      (data) => data.quantity !== undefined && data.inStock !== undefined,
      {
        message: "Inventory is required",
      },
    ),
});

export default productSchemaValidationZod;
