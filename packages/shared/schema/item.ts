import {z} from 'zod'

export const ItemSchema = z.object({
    name : z.string().max(100, "name cannot be more than 100 characters"),
    description : z.string().max(500, "description cannot be more than 500 characters").optional(),
    price: z.number().nonnegative()
})

export type ItemType = z.infer<typeof ItemSchema>