import crypto from 'crypto';
import config from '../config/config.json';
import { Condition, Group, Test, User } from '../model/TestModel';

const evaluateCondition = (userValue: any, condition: Condition): boolean => {
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
  return (config.tests as Test[]).find((test) => {
    return Object.entries(test.conditions).every(([key, condition]) => {
      return evaluateCondition((user as any)[key], condition);
    });
  });
};

export const getGroupForUser = (
  user: User,
  groups: { [key: string]: Group }
): string | null => {
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
      return group;
    }
  }

  return null;
};
