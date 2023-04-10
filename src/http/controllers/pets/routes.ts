import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyOrgRole } from '@/http/middlewares/verify-role-org'
import { verfiyJWT } from '@/http/middlewares/verify-jwt'
import { petDetails } from './pet-details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets/register',
    { onRequest: [verfiyJWT, verifyOrgRole('ADMIN')] },
    register,
  )

  app.get('/pets/:id/details', petDetails)
  app.get('/pets/search', search)
}
