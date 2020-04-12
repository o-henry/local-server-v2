import express, { Application, Request, Response, NextFunction } from 'express'
import { jejuController } from './controller'

const app: Application = express();

// use all controller(APIs) here (Routing)
app.use("/", jejuController)

app.listen(8080, () => {
    console.log("Server is running on port 8080!");
});