import crypto from 'crypto';
import { Condition, Group, Test, User } from '../model/TestModel';
import { metrics } from '../metrics/metrics';
import { jsonFile } from '../config/FileConfig';

const evaluateCondition = (userValue: string | number, condition: Condition): boolean => {
  const { op, value } = condition;

  switch (op) {
    case '>':
      return userValue > value;
    case '<':
      return userValue < value;
    case '=':
      return userValue === value;
    case '!=':
      return userValue !== value;
    default:
      return false;
  }
};

export const getMatchingTest = (user: User): Test | undefined => {
  return (jsonFile.tests as Test[]).find((test) => {
    return Object.entries(test.conditions).every(([key, condition]) => {
      let userValue = user[key as keyof User];
      if (typeof userValue === 'string') {
        userValue = userValue.toLowerCase();
      }
      return evaluateCondition(userValue, condition);
    });
  });
};

export const getGroupForUser = (user: User, groups: { [key: string]: Group }): string => {
  const userPropertiesString = `${user.age}-${user.name}-${user.favorite_animal}`;
  const hash = crypto
    .createHash('md5')
    .update(userPropertiesString)
    .digest('hex');
  const hashInt = parseInt(hash.substring(0, 8), 16);
  const totalPercentage = 100;
  let cumulativePercentage = 0;

  for (const [group, { percentage }] of Object.entries(groups)) {
    cumulativePercentage += percentage;
    if (hashInt % totalPercentage < cumulativePercentage) {
      metrics.incrementMetric(group);
      return group;
    }
  }
};
