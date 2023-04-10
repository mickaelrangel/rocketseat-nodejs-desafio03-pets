import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface GetOrgProfileServiceRequest {
  orgId: string
}

interface GetOrgProfileServiceResponse {
  org: Org
}

export class GetOrgProfileService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileServiceRequest): Promise<GetOrgProfileServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    return {
      org,
    }
  }
}
