import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import projectRoutes from './routes/project';

// create express app and register routes
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
    return response.json({ message: 'Hello World' });
});

app.use('/projects', projectRoutes);

export default app;
