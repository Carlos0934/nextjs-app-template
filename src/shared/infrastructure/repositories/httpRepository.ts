import { Entity } from '@shared/domain/models'
import { Filter, Repository } from '@shared/domain/repositories'

export interface HttpRepositoryOptions {
  baseUrl?: string
}
export class HttpRepository<T extends Entity> implements Repository<T> {
  private async fetch<R>(url: string, options?: RequestInit) {
    const response = await fetch(url, options)
    return (await response.json()) as R
  }
  constructor(private url: string, private options?: HttpRepositoryOptions) {}
  findById(id: string): Promise<T> {
    return this.fetch(`${this.url}?id=${id}`)
  }
  save(entity: T): Promise<T> {
    return this.fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  update(entity: T): Promise<T> {
    return this.fetch(this.url, {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  delete(id: string): Promise<void> {
    return this.fetch(`${this.url}?id=${id}`, {
      method: 'DELETE',
    })
  }

  async findAll(filter?: Filter<T>): Promise<T[]> {
    const params = this.filterToQueryParams(filter)
    const url = `${this.url}?${params}`
    return this.fetch(url)
  }

  private filterToQueryParams(filter?: Filter<T>): string {
    let filterParsed: Record<string, string> | undefined
    if (filter)
      filterParsed = Object.keys(filter).reduce((acc, key) => {
        const value = (filter as Record<string, unknown>)[key]
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean' ||
          value instanceof Date
        ) {
          acc[key] = value.toString()
        }

        return acc
      }, {} as Record<string, string | string>)

    const params = new URLSearchParams(filterParsed).toString()
    return params
  }
}
