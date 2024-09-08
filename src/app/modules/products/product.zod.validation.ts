import { z } from 'zod';

//* Variant validation schema
export const variantSchema = z.object({
  type: z.string().nonempty('Variant type is required'),
  value: z.string().nonempty('Variant value is required'),
});

//* Inventory validation schema
export const inventorySchema = z.object({
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean(),
});

//* Product validation schema
const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    price: z.number().positive('Price must be a positive number'),
    category: z.string().nonempty('Category is required'),
    tags: z.array(z.string()).optional(),
    variants: z.array(variantSchema),
    inventory: inventorySchema,
  }),
});

export const productValidations = {
  createProductValidationSchema,
};
