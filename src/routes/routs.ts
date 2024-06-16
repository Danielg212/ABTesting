import express from 'express';
import { abTestController } from '../controller/abtest.controller';

export class Router {
  constructor(private app: express.Application) {
    this.init();
  }

  getRoutes() {
    return this.app;
  }
  init() {
    this.app.get('/hello', (request, response, next) =>
      response.status(200).json('world!')
    );

    this.app.post('/getTest', (req, res, next) =>
      abTestController.getTest(req, res)
    );
  }
}

export default new Router(express());
