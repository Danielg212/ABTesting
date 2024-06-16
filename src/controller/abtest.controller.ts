import { Request, Response } from 'express';
import { abTestService } from '../service/ABTestService';

class ABTestController {
  public async getTest(req: Request, res: Response) {
    try {
      const test = await abTestService.getTest(req.body);
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const abTestController = new ABTestController();
