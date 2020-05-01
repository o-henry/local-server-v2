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

jejuController.get('/today', cors(), async (req: Request, res: Response, next: NextFunction) => {
    recLocation(req, res, {
        data: { $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60000) }
    })
})


jejuController.get("/week", cors(), (req, res) => {
    recLocation(req, res, {
        date: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60000) },
    });
});

jejuController.get("/month", cors(), (req, res) => {
    recLocation(req, res, {
        date: { $gte: new Date(new Date().getTime() - 31 * 24 * 60 * 60000) },
    });
});

export default jejuController
