import express from 'express'
import { Jeju } from '../database/models'

const jejuController = express.Router();

jejuController.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('welcome')
    // Jeju.find({}, (err: any, result: Document) => {
    //     res.status(200).send('Check server')
    // })
})

/**
 * POST
 * Add a new Crawl data to jeju DB
 */

export default jejuController
