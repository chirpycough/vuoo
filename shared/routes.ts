import { z } from 'zod';
import { insertWalletSchema, wallets } from './schema';

export const api = {
  wallets: {
    create: {
      method: 'POST' as const,
      path: '/api/wallets' as const,
      input: insertWalletSchema,
      responses: {
        201: z.custom<typeof wallets.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
