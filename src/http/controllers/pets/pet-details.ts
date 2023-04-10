import { makeGetPetDetailsService } from '@/services/factories/make-get-pet-details-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = petDetailsParamsSchema.parse(request.params)

  const service = makeGetPetDetailsService()

  const { pet } = await service.execute({
    petId,
  })

  return reply.status(200).send({
    pet: { pet },
  })
}
