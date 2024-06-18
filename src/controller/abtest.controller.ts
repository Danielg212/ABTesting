import { Request, Response } from 'express';
import { Logger, ILogObj } from 'tslog';
import { metrics } from '../metrics/metrics';
import { getGroupForUser, getMatchingTest } from '../utils/utils';
import { loadConfig } from '../config/FileConfig';

class ABTestController {
  private readonly logger: Logger<ILogObj> = new Logger({ name: ABTestController.name, type: 'pretty' });

  constructor() {
    loadConfig();
  }

  public async getTest(req: Request, res: Response) {
    try {
      this.logger.info('getTest:', req.body);
      const user = req.body;

      if (user.age === undefined || !user.name || !user.favorite_animal) {
        this.logger.warn('Missing required parameters');
        return res.status(400).json({ error: 'age, name, and favorite_animal are required' });
      }
      const test = getMatchingTest(user);
      if (!test) {
        this.logger.info('No matching test found for user', user);
        return res.status(404).json({ error: 'No matching test found' });
      }

      const group = getGroupForUser(user, test.groups);
      if (!group) {
        this.logger.error('Failed to assign variant');
        return res.status(500).json({ error: 'Failed to assign variant' });
      }
      const result = test.groups[group].results;
      return res.status(200).send(result);
    } catch (error) {
      this.logger.error('Error in getTest', error.message);
      res.status(500).json(error);
    }
  }

  public getMetrics(req: Request, res: Response) {
    const metricsHistory = metrics.getMetrics();
    res.status(200).json(metricsHistory);
  }
}
export const abTestController = new ABTestController();
