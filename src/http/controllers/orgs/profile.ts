import { makeGetOrgProfileService } from '@/services/factories/make-get-org-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const service = makeGetOrgProfileService()

  const { org } = await service.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password: undefined,
    },
  })
}
