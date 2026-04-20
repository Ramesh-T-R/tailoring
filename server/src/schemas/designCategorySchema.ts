import { z } from 'zod';

export const DesignCategorySchema = z.object({
  name: z.string().min(1).max(50),
});
