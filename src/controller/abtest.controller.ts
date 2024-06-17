import { Request, Response } from 'express';
import { abTestService } from '../service/ABTestService';
import { getMatchingTest, getGroupForUser } from "../utils/utils";
import { metrics } from '../metrics/metrics';

class ABTestController {
  public async getTest(req: Request, res: Response) {
    try {
      const user = req.body;

      if (user.age === undefined || !user.name || !user.favorite_animal) {
        return res
          .status(400)
          .json({ error: 'age, name, and favorite_animal are required' });
      }

      // Check if a variant is already assigned in the cookies
      // const existingGroup = req.cookies.variant;
      const test = getMatchingTest(user);
      // if (existingGroup) {
      //   if (test && test.groups[existingGroup]) {
      //     const result = test.groups[existingGroup].results;
      //     return res.status(200).send(result);
      //   }
      // }
      if (!test) {
        return res.status(404).json({ error: 'No matching test found' });
      }

      const group = getGroupForUser(user, test.groups);
      if (group === null) {
        return res.status(500).json({ error: 'Failed to assign group' });
      }
      const result = test.groups[group].results;

      // res.cookie('variant', group, {
      //   maxAge: 900000,
      //   httpOnly: true,
      // }); // TODO use config.yaml for maxAge

      return res.status(200).json({ group, result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public getMetrics(req: Request, res: Response) {
     const metricsHistory = metrics.getMetrics();
    res.status(200).json(metricsHistory);

  }
}

export const abTestController = new ABTestController();
