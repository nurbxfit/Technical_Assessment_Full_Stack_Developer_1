import { z } from "zod";

function getRefinedNonNegativeStringToNumberSchema(
  message: string,
  toFix?: number
) {
  return z
    .string()
    .refine((value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    }, message)
    .transform((value) => parseFloat(parseFloat(value).toFixed(toFix)));
}

export const NameInputSchema = z
  .string()
  .nonempty()
  .max(100, "Name should be less 100 characters");

export const DescriptionInputSchema = z
  .string()
  .max(500, "description cannot be more than 500 characters")
  .optional();

export const PriceInputSchema = getRefinedNonNegativeStringToNumberSchema(
  "Price must be a positive number"
);

export const ItemSchema = z.object({
  name: NameInputSchema,
  description: DescriptionInputSchema,
  price: PriceInputSchema,
});

export type ItemType = z.infer<typeof ItemSchema>;

const IdValidationSchema = z
  .string()
  .nonempty("ID is required")
  .refine((value) => {
    const parsedValue = parseInt(value, 10);
    return (
      !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue > 0
    );
  }, "ID must be a positive integer")
  .transform((value) => parseInt(value, 10));

export const DeleteItemRequestSchema = z.object({
  params: z.object({
    id: IdValidationSchema,
  }),
});

export const UpdateItemRequestSchema = z.object({
  body: ItemSchema,
  params: z.object({
    id: IdValidationSchema,
  }),
});

export const CreateItemRequestSchemma = z.object({
  body: ItemSchema,
});
