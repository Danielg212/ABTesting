import express, { Application } from 'express'; // Backend App (server)
import routes from './routes/routs'; // Routes
import cookieParser from 'cookie-parser';
// import morgan from 'morgan'; // Logs incoming requests

const app: Application = express();
app.use(cookieParser());


app.use(express.json({ limit: '1mb' })); // body parser
app.use(express.urlencoded({ limit: '1mb', extended: false })); // url parser

// routes
app.get('/', (request, response, next) =>
  response.status(200).json('AB-TEST app')
);
app.use('/api/', routes.getRoutes());

// server is listening for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is listening on: http://localhost:${PORT}`);
});
