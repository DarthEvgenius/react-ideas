import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(1, 'Name is requered'),
  nick: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      'Nick may contain only lowercase letters, numbers and dashes'
    ),
  description: z.string().min(1, 'Description is requered'),
  text: z.string().min(10, 'Text should be at least 10 characters long'),
})
