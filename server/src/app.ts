import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
    return response.json({ message: 'Hello World' });
});

export default app;
