import { NextApiRequest, NextApiResponse } from "next/types"
import { createORM } from "../config/mikro-orm"


export const withOrmRoute = (
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => async (req: NextApiRequest, res: NextApiResponse) => {
    await createORM()
    try {
        await handler(req, res)
    } catch (error) {
        if (error instanceof Error)
        res.status(500).json({ error: error.message })

    } 
}