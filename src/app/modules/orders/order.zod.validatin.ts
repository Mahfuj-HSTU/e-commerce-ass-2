import { z } from 'zod';

//* order validation schema
const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    productId: z.string().nonempty(),
    price: z.number().positive(),
    quantity: z.number(),
  }),
});

export const ordertValidations = {
  createOrderValidationSchema,
};
