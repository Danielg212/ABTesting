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
    this.app.post('/getTest', (req, res, next) => abTestController.getTest(req, res));

    this.app.get('/getMetrics', (req, res, next) => abTestController.getMetrics(req, res));
  }
}

export default new Router(express());
