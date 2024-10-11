import { z } from 'zod';

export const zOrder = z.object({
  key: z.string(),
  order: z.array(
    z
      .object({
        name: z.string(),
        quantity: z.number(),
      })
      .strict(),
  ),
});
