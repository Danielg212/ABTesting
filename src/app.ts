import routes from './routes/routs';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser'; // Routes
// import morgan from 'morgan';

const app: Application = express();

app.use(cookieParser());

app.use(express.json({ limit: '1mb' })); // body parser
app.use(express.urlencoded({ limit: '1mb', extended: false })); // url parser

// routes
app.get('/', (request, response, next) => response.status(200).json('AB-TEST app'));
app.use('/', routes.getRoutes());

export default app;
