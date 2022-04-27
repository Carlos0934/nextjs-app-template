export interface Controller {
  attach(req: NextApiRequest, res: NextApiResponse): void
}
