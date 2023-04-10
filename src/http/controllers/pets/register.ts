import { OrgNotFoundError } from '@/services/errors/org-not-found-error'
import { makeRegisterPetService } from '@/services/factories/make-register-pet-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    age: z.number().max(20),
    energy: z.number().min(1).max(5),
    independence: z.enum(['LOW', 'MID', 'HIGH']),
    size: z.enum(['SMALL', 'MID', 'LARGE']),
    orgId: z.string().uuid(),
  })

  const { name, age, energy, independence, size, orgId } =
    registerPetBodySchema.parse(request.body)

  try {
    const service = makeRegisterPetService()

    await service.execute({
      name,
      age,
      energy,
      independence,
      size,
      orgId,
    })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
