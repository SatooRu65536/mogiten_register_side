import { z } from 'zod';

export const zOrder = z.array(
  z
    .object({
      name: z.string(),
      quantity: z.number(),
    })
    .strict(),
);
