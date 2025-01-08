import { z } from "zod";

export const ItemSchema = z.object({
	name: z.string().max(100, "name cannot be more than 100 characters"),
	description: z
		.string()
		.max(500, "description cannot be more than 500 characters")
		.optional(),
	price: z.number().nonnegative(),
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
