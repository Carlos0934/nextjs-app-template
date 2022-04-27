import type { Project } from '../models/project'
import { HttpRepository } from '../repositories/httpRepository'

const projectRepository = new HttpRepository<Project>('/api/companies/projects')
export default {
  project: projectRepository,
} as const
