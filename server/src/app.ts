import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import projectRoutes from './routes/project';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);

export default app;
