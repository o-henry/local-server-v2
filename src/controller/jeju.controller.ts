import express, { Request, Response, NextFunction } from 'express'
import { Jeju } from '../database/models'

const jejuController = express.Router();

/**
 * GET/
 * retrieve and display all location tags in the Jeju Model
 */

jejuController.get('/', (req: Request, res: Response, next: NextFunction) => {
    Jeju.find({}, (err: any, result: Document) => {
        res.status(200).send('Check server')
    })
})

export default jejuController
