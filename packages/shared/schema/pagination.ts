import { z } from "zod";

export const PaginationSchema = z.object({
  limit: z.number().nonnegative("limit must be a non-negative value"),
  skip: z.number().nonnegative("skip must be a non-negative value"),
});

export type PaginationType = z.infer<typeof PaginationSchema>;
