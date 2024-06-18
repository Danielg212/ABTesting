import express, { Application } from 'express';
import cookieParser from 'cookie-parser'; // Routes
import morgan from 'morgan';
import routes from './routes/routs';

const app: Application = express();

app.use(cookieParser());

app.use(express.json({ limit: '1mb' })); // body parser
app.use(express.urlencoded({ limit: '1mb', extended: false })); // url parser
app.use(morgan('tiny'));

// routes
app.get('/', (request, response, next) => response.status(200).json('Welcome AB-TEST app! 🚀'));
app.use('/', routes.getRoutes());
app.get('/healthCheck', (req, res) => res.status(200).send());

export default app;
