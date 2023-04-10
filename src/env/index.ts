import 'dotenv/config'
import { z } from 'zod'

const ERROR = 'Invalid environment variables'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(ERROR, _env.error.format())

  throw new Error(ERROR)
}

export const env = _env.data
