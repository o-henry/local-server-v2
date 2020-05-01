require("dotenv").config({ path: "./config/.env" });
import express, { Application } from 'express'
import { jejuController } from './controller'
import mongoose from 'mongoose';

const app: Application = express();

// use all controller(APIs) here (Routing)
app.use("/", jejuController)

// Start Server here
app.listen(8080, () => {
    console.log("Server is running on port 8080!");
    if (process.env.MONGO_URL_JEJU) {
        mongoose.connect(process.env.MONGO_URL_JEJU, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected to MongoDB')
        })
    }
});