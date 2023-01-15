import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import projectRoutes from './routes/project'
import authRoutes from './routes/auth'
import unknownEndPointHandler from './middleware/unknownEndpoint'
import errorHandler from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', authRoutes)
app.use('/projects', projectRoutes)

app.use(unknownEndPointHandler)
app.use(errorHandler)

export default app
