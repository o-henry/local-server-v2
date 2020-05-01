import express, { Request, Response, NextFunction } from 'express'
import { Jeju } from '../database/models'
import recLocation from '../crawler/rec.data'
import cors from 'cors'

const jejuController = express.Router();

/**
 * GET/
 * retrieve and display all location tags in the Jeju Model
 */

jejuController.get('/', cors(), async (req: Request, res: Response, next: NextFunction) => {
    const recommend = await recLocation(req, res, {})
    res.status(200).send(recommend)
})

export default jejuController
