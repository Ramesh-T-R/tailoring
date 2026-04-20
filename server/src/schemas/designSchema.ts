import { z } from 'zod';

export const DesignSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.string().min(1), // ObjectId string
  description: z.string().max(50),
});
