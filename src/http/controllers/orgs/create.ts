import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { RequiredFieldsOrgError } from '@/services/errors/required-fields-org-error'
import { makeCreateOrgService } from '@/services/factories/make-create-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().min(8).max(8),
    city: z.string(),
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
  })

  const { name, email, cep, city, phone, password } = createBodySchema.parse(
    request.body,
  )

  try {
    const service = makeCreateOrgService()

    await service.execute({ name, email, cep, city, phone, password })
  } catch (error) {
    if (
      error instanceof OrgAlreadyExistsError ||
      error instanceof RequiredFieldsOrgError
    ) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
  return reply.status(201).send()
}
