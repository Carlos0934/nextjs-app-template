import {
  Repositories,
  useRepositoryContext,
} from '@shared/contexts/repositories'

export const useRepository = (repositoryKey: Repositories) => {
  const context = useRepositoryContext()
  const repository = context.repositories[repositoryKey]

  return repository
}
