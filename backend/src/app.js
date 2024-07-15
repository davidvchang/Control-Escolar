import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";

import studentsRoutes from "./routes/students.routes.js";

const app = express()

//SETTINGS
app.set('port', process.env.PORT || 4000)

//MIDDLEWARES
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

//ROUTES
app.use('/api/students', studentsRoutes)

export default app