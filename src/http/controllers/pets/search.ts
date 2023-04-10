import { OrgsByCityNotFoundError } from '@/services/errors/orgs-by-city-not-found-error'
import { ParamCityNotInformedError } from '@/services/errors/param-city-not-informed-error'
import { makeSearchPetsByCityService } from '@/services/factories/make-search-pets-by-city-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    q: z.string(),
  })

  const { q } = searchPetsParamsSchema.parse(request.query)

  try {
    const service = makeSearchPetsByCityService()

    const { pets } = await service.execute({ query: q })

    return reply.status(200).send({ pets })
  } catch (error) {
    if (
      error instanceof ParamCityNotInformedError ||
      error instanceof OrgsByCityNotFoundError
    ) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
