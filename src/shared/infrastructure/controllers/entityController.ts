import { NextApiRequest, NextApiResponse } from 'next/types'
import { Entity } from '../../domain/models'
import { Repository } from '../../domain/repositories'
import { Controller } from './controller'

export class EntityController<T extends Entity> implements Controller {
  constructor(private repository: Repository<T>) {}
  async get(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.id) {
      const entity = await this.repository.findById(req.query.id as string)

      res.status(200).json(entity)
      return
    }
    const queryParams = req.query as Record<string, string>
    const filter = Object.keys(queryParams).reduce(
      (acc, key) => ({ ...acc, [key]: queryParams[key] }),
      {} as Record<string, string>,
    )
    const entities = await this.repository.findAll({ ...filter } as any)
    res.status(200).json(entities)
  }
  async post(req: NextApiRequest, res: NextApiResponse) {
    const entity = await this.repository.save(req.body)
    res.status(201).json(entity)
  }
  async put(req: NextApiRequest, res: NextApiResponse) {
    const entity = await this.repository.update(req.body)
    res.status(201).json(entity)
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    await this.repository.delete(req.query.id as string)
    res.status(201).json({})
  }

  async attach(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method!.toUpperCase()
    switch (method) {
      case 'GET':
        return this.get(req, res)
      default:
        res.status(405).end()
    }
  }
}
