import express, { Application } from 'express';
import cors from 'cors';
import { catchErrors } from './middlewares/catchErrors';
import currencyExchange from './routes/exchange.router';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/exchange', currencyExchange);

app.use(catchErrors);

export default app;
