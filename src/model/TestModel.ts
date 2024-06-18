export interface Condition {
  op: string;
  value: any;
}

export interface Group {
  results: string;
  percentage: number;
}

export interface Test {
  conditions: Record<string, Condition>;
  groups: Record<string, Group>;
}

export interface User {
  age: number;
  name: string;
  favorite_animal: string;
}
