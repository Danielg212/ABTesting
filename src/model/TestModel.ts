interface Condition {
    op: string;
    value: any;
}

interface Group {
    results: string;
    percentage: number;
}

interface Test {
    conditions: {
        [key: string]: Condition;
    };
    groups: {
        [key: string]: Group;
    };
}

interface User {
    userId: string;
    age: number;
    name: string;
    favorite_animal: string;
}