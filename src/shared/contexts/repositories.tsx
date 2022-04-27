import { createContext, useContext } from 'react'
import { Repository } from '../domain/repositories'

export interface RepositoryContextProps {
  repositories: {}
}
export type Repositories = keyof RepositoryContextProps['repositories']

const RepositoryContext = createContext<RepositoryContextProps>(
  undefined as any,
)

const RepositoryProvider: React.FC<{
  children: React.ReactNode
  repositories: RepositoryContextProps['repositories']
}> = ({ children, repositories }) => {
  return (
    <RepositoryContext.Provider value={{ repositories }}>
      {children}
    </RepositoryContext.Provider>
  )
}

export const useRepositoryContext = () => {
  const context = useContext(RepositoryContext)
  if (context === undefined) {
    throw new Error(
      'useRepositoryContext must be used within a RepositoryProvider',
    )
  }
  return context
}
export { RepositoryContext, RepositoryProvider }
