import { z } from "zod";

const orderSchemaValidationZod = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .transform((val) => val.trim()),
  productId: z
    .string()
    .min(1, "Product ID is required")
    .transform((val) => val.trim()),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().int().min(1, "Quantity must be a positive integer"),
});

export default orderSchemaValidationZod;
