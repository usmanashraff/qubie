import {z} from "zod"

export const SendMessageValidator = z.object({
    groupId: z.string(),
    message: z.string()
})